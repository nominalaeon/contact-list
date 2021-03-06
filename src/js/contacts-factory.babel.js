'use strict';

/**
 * Class representing a helper service, instanced per node.
 * Responsible for DOM manipulation, event handling, and business logic
 */
class ContactsFactory {

    /**
     * Create a Contacts helper instance
     * @param {object} contactList - Static properties used to populate the getter/setters
     */
    constructor(contactList) {
        this._vm = {};

        for (var prop in contactList) {
            if (!contactList.hasOwnProperty(prop)) {
                continue;
            }
            this[prop] = contactList[prop];
        }
    }

    get $listGroup() {
        return this._vm.$listGroup || $('');
    }
    set $listGroup(listGroup) {
        this._vm.$listGroup = $(listGroup);
    }
    get $root() {
        return this._vm.$root || $('');
    }
    set $root(root) {
        this._vm.$root = $(root);
    }
    get contacts() {
        return this._vm.contacts || [];
    }
    set contacts(contacts) {
        this._vm.contacts = contacts;
    }

    init() {
        this.retrieveContacts()
            .then(this.assignContacts.bind(this))
            .then(this.bindEvents.bind(this));
    }

    addContact(contact) {
        var contacts = this.contacts;

        contacts.push(new ContactVM(contact));

        this.contacts = contacts;
    }

    assignContacts(results) {
        if (results.error) {
            return results.error;
        }

        var contacts = this.contacts;

        results.data.contacts.forEach((contact) => {
            contacts.push(new ContactVM(contact));
        });

        this.contacts = contacts;

        return this.updateList();
    }

    bindEvents() {
        this.$formGroup.find('.contact-form__input ').off().on('keyup', this.onChangeForm.bind(this));
        this.$formGroup.find('.contact-form__submit').off().on('click', this.onSubmitForm.bind(this));
        this.$listGroup.find('.contact-list__remove').off().on('click', this.onClickRemove.bind(this));

        this.$label.find('input').on('focus', (event) => {
            $(event.currentTarget).select();
        });
    }

    onChangeForm(event) {
        var isValid = true;

        this.$formGroup.find('.contact-form__input').each((index, input) => {
            if ($(input).val() && $(input).val() !== '') { return; }
            isValid = false;
        });

        this.$formGroup.find('.contact-form__submit').prop('disabled', !isValid);
    }

    onClickRemove(event) {
        var contactId = event.currentTarget.closest('.contact').dataset.contact;
        var contacts = [];

        this.contacts.forEach((contact) => {
            if (contact.id === contactId) { return; }
            contacts.push(contact);
        });
        this.contacts = contacts;

        return APIService.deleteContact(contactId)
            .then(this.updateList.bind(this))
            .then(this.bindEvents.bind(this));
    }

    onSubmitForm(event) {
        var $firstName = this.$formGroup.find('input[name="first-name"]');
        var $lastName = this.$formGroup.find('input[name="last-name"]');

        var contact = {
            firstName: $firstName.val(),
            id: this.retrieveNewContactId(),
            lastName: this.$formGroup.find('input[name="last-name"]').val()
        };

        /** Reset contact form */
        $firstName.val('');
        $lastName.val('');
        this.$formGroup.find('.contact-form__submit').prop('disabled', true);

        return APIService.postContact(contact)
            .then(this.assignContacts.bind(this))
            .then(this.bindEvents.bind(this));
    }

    retrieveContacts() {
        return APIService.getContacts();
    }

    retrieveNewContactId() {
        var id = this.contacts.length + 1;
        var ids = this.contacts.map(contact => contact.id).sort((a, b) => {
            return b - a;
        });
        var newId = parseInt(ids[0]) + 1;

        return newId.toString();
    }

    updateList() {
        var self = this;
        this.$listGroup.find('.contact').remove();
        this.contacts.forEach((contact) => {
            self.$listGroup.append(contact.$listItem);
        });
    }
}