Ext.define('Terp.view.tsoft.componentux.TsoftSearchForm', {
    extend: 'Terp.view.tsoft.componentbase.TsoftForm',
    xtype: 'tsoftsearchform',

    requires: [
        'Ext.layout.container.Table'
    ],

    padding : '0 0 5 0',
    bodyPadding: '5 5 5 5',
    border: true ,
    layout: {
        type : 'table'
    },
    columnWidth: 200,
    //reference: 'searchForm'

    // 엔터키 입력시 자동 조회
    autoSelectOnEnterKey: false,

    listeners: {
        boxready: function(form) {
            var topOwnerCt = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
            form.getForm().getFields().each(function(field) {
                field.on({
                    setcallbackvalue: function(fld,data) {
                        if (topOwnerCt.getController().onSelect) {
                            topOwnerCt.getController().onSelect();
                        }
                        Ext.defer(function() {
                            fld.blur();
                        },100);
                    }
                });
            });
            if (this.autoSelectOnEnterKey) {
                form.getForm().getFields().each(function(field) {
                    if (Ext.String.endsWith(field.xtype, 'helpfield', true)) {
                        field.setEditable(false);
                    }
                    field.on({
                        specialkey: function(fld,event) {
                            if (event.getKey() === event.ENTER) {
                                //console.log(fld.getName());
                                this.blur();
                                if (topOwnerCt.getController().onSelect) {
                                    topOwnerCt.getController().onSelect();
                                }
                            }
                        }
                    });
                });
            }
        }
    }

});