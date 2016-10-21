(() => {

    'use strict';

    $('.contacts').each(init);

    function init(index, root) {
        var contactList = new ContactsFactory({
            $formGroup: $(root).find('.contacts__form'),
            $label: $(root).find('.contacts__label'),
            $listGroup: $(root).find('.contacts__list'),
            $root: $(root)
        });

        contactList.init();
    }

})();