
'use strict';

/**
 * Service for connecting to a RESTful API.
 * Response format based on standards outlined in the JSON API spec
 * http://jsonapi.org/
 */
var APIService = (() => {
    /**
     * Hardcoded values to simulate results from a db
     */
    const _contacts = [{
        firstName: 'Richard',
        id: '1',
        lastName: 'Mayhew'
    }, {
        firstName: 'Mister',
        id: '2',
        lastName: 'Croup'
    }, {
        firstName: 'Marquee',
        id: '3',
        lastName: 'de Carabas'
    }];

    return {
        deleteContact: deleteContact,
        getContact: getContact,
        getContacts: getContacts,
        postContact: postContact
    };

    function deleteContact(contactId) {
        return new Promise((resolve, reject) => {
            resolve({ data: {} });
        });
    }

    function getContacts() {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    contacts: _contacts
                }
            });
        });
    }

    function getContact(contactId) {
        var contact = _.find(_contacts, {
            id: contactId
        });
        return new Promise((resolve, reject) => {
            if (contact) {
                resolve({
                    data: {
                        contacts: [contact]
                    }
                });
            } else {
                reject({
                    error: 'No user found for ID: ' + contactId
                });
            }
        });
    }

    function postContact(contact) {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    contacts: [contact]
                }
            });
        });
    }
})();
