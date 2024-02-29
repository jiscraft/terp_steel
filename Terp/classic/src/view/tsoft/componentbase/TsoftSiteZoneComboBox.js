/**
 * Created by Andrew on 2016. 8. 12..
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftSiteZoneComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tsoftsitezonecombobox',


    labelSeparator: '',
    labelWidth: 60 ,
    width: 200 ,
    displayField: 'nm_zone',
    valueField: 'cd_zone',
    queryMode: 'local',
    allowBlank: true ,
    editable: true,
    selectOnFocus: true,

    store: { fields: [] },
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.clearValue();
            }
        }
    },
    // onBlur:function(o){
    //     // setTimeout(function(){
    //         if(o.browserEvent.fromComponent.lastSelection == null)
    //         {
    //             // console.log('완벽')
    //             Terp.app.getController('TerpCommon').toastMessage('없는 데이터입니다','b');
    //             this.setValue(null);
    //             this.setRawValue(null);
    //             this.lastValue = null;
    //             this.lastQuery = null;
    //             this.lastQuery = null;
    //             this.lastMutatedValue = null;
    //
    //         }
    //     // },40)
    //
    //
    // },
    onBlur:function(o){

        if(o.browserEvent.fromComponent.lastSelection == null)
        {
            // console.log('완벽')
            Terp.app.getController('TerpCommon').toastMessage('없는 데이터입니다','b');
            this.setValue(null);
            this.setRawValue(null);
            this.lastValue = null;
            this.lastQuery = null;
            this.lastQuery = null;
            this.lastMutatedValue = null;

        }
    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    clear: function () {
        // this.setRawValue('');
        this.setValue('');
    },
    onFocus : function(){
        var me = this;
        if (!Ext.isEmpty(this.ownerCt.context)) {
            this.setRawValue(this.ownerCt.context.record.get(this.ownerCt.context.field));
        }
        var val = null;
        if (this.typeOfZone === 'grid') {
            val = me.ownerCt.column.ownerCt.grid.getSelectionModel().getLastSelected().get(this.dataIndexOfCdSite);
        }
        else if (this.typeOfZone === 'form') {
            console.log( me.ownerCt.up('form'));
            if(me.ownerCt.up('form') == undefined)
            {
                val = me.ownerCt.getForm().findField(this.dataIndexOfCdSite).getValue();

            }
            else
            {
                val = me.ownerCt.up('form').getForm().findField(this.dataIndexOfCdSite).getValue();

            }
        }
        if (Ext.isEmpty(val) && !me.hidden && !me.disabled) {
            Terp.app.getController('TerpCommon').toastMessage('현장을 먼저 선택해야 합니다','b');
            return false;
        }
        else {
            var sendDataJson = {
                loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
                loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
                cd_site: val,
                // yn_use: 'Y',
                actiondata: 'r'
            };
            me.getStore().removeAll();
            Ext.Ajax.request({
                async: false,
                url: '/ServerPage/cn/cn_site_zone.jsp',

                params: {
                    sendData: Ext.encode([sendDataJson])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        if (obj.data.length > 0) {
                            // console.log( me.ownerCt.getStore())
                            me.getStore().add(obj.data);
                        }
                    }
                    else {
                        Terp.app.getController('TerpCommon').msgBox.alert('오류', obj.msg);
                    }
                },
                fail: function () {
                    Terp.app.getController('TerpCommon').msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
                }
            });
        }
    },
    listeners: {
        // focus: function(field) {
        //
        //     if (!Ext.isEmpty(this.ownerCt.context)) {
        //         this.setRawValue(this.ownerCt.context.record.get(this.ownerCt.context.field));
        //     }
        //     var val = null;
        //     if (this.typeOfZone === 'grid') {
        //         val = field.column.ownerCt.grid.getSelectionModel().getLastSelected().get(this.dataIndexOfCdSite);
        //     }
        //     else if (this.typeOfZone === 'form') {
        //         val = field.up('form').getForm().findField(this.dataIndexOfCdSite).getValue();
        //     }
        //     if (Ext.isEmpty(val)) {
        //         Terp.app.getController('TerpCommon').toastMessage('현장을 먼저 선택해야 합니다','b');
        //         return false;
        //     }
        //     else {
        //         var sendDataJson = {
        //             loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
        //             loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
        //             cd_site: val,
        //             // yn_use: 'Y',
        //             actiondata: 'r'
        //         };
        //
        //         field.getStore().removeAll();
        //         Ext.Ajax.request({
        //             async: false,
        //             url: '/ServerPage/cn/cn_site_zone.jsp',
        //             params: {
        //                 sendData: Ext.encode([sendDataJson])
        //             },
        //             success: function (res) {
        //                 var obj = Ext.JSON.decode(res.responseText);
        //                 if (obj.success) {
        //                     if (obj.data.length > 0) {
        //                         field.getStore().add(obj.data);
        //                     }
        //                 }
        //                 else {
        //                     Terp.app.getController('TerpCommon').msgBox.alert('오류', obj.msg);
        //                 }
        //             },
        //             fail: function () {
        //                 Terp.app.getController('TerpCommon').msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
        //             }
        //         });
        //     }
        // },
        blur: function(field,e){
            // console.log(field)
            // if(field.browserEvent.fromComponent.lastSelection == null)
            // {
            //     // console.log('완벽')
            //     Terp.app.getController('TerpCommon').toastMessage('없는 데이터입니다','b');
            //     this.setValue(null);
            //     this.setRawValue(null);
            //     this.lastValue = null;
            //     this.lastQuery = null;
            //     this.lastQuery = null;
            //     this.lastMutatedValue = null;
            //
            // }
        },
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});