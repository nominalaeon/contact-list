'use strict';

/** Class representing a contact. */
class ContactVM {

    /**
     * Create a contact.
     * @param {object} contact - Static properties used to populate the getter/setters
     */
    constructor(contact) {
        this._vm = {};

        for (var prop in contact) {
            if (!contact.hasOwnProperty(prop)) {
                continue;
            }
            this[prop] = contact[prop];
        }

        this.buildRoot();
    }

    get $listItem() {
        return this._vm.$listItem || [];
    }
    set $listItem(listItem) {
        this._vm.$listItem = $(listItem);
    }
    get firstName() {
        return this._vm.firstName || [];
    }
    set firstName(firstName) {
        this._vm.firstName = firstName;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    get id() {
        return this._vm.id || null;
    }
    set id(id) {
        this._vm.id = id;
    }
    get lastName() {
        return this._vm.lastName || '';
    }
    set lastName(lastName) {
        this._vm.lastName = lastName;
    }

    buildRoot() {
        var html = '<li class="list-group-item contact" ' +
            'data-contact="' + this.id + '">' +
            this.fullName +
            '<button type="button" class="contact-list__remove btn btn-danger btn-xs pull-right">' +
            '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' +
            '</button>' +
            '</li>';
        this.$listItem = $(html);
    }
}