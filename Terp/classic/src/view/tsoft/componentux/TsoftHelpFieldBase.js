/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftHelpFieldBase', {
    extend: 'Ext.form.TextField',
    xtype: 'tsofthelpfieldbase',

    config: {
        displayValue: '',
        realValue: '',
        selectedData: null
    },

    labelSeparator: '',
    displayField: 'name',
    valueField: 'value',

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,
    disabled: false ,
    searchValues: {},

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function() {
                this.onSearch();
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function() {
                if (!this.allowBlank) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.onClear();
            }
        }
    },

    listeners: {
        specialkey: function(field, e) {
            if (!field.readOnly && field.getEditable() && (e.getKey() == e.ENTER)) {
                this.onEnterKey(field, e);
            }
        }
    },

    getValue: function() {
        return this.getRealValue();
    },

    getRawValue: function() {
        return this.getRealValue();
    },

    clear: function() {
        this.bindValues('','');
        // this.setValue('');
        // this.setRawValue('');
        this.inputEl.dom.value = '';
        // this.setDisplayValue('');
        // this.setRealValue('');
        this.setSelectedData(null);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, '');
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, '');
            }
            this.ownerCt.selectedData = null;
        }
    },

    bindValues: function(v, nm) {
        this.setDisplayValue(nm);
        this.setRealValue(v);
        this.setRawValue(nm);
        this.setValue(v);
    },

    onFocus: function() {
        this.callParent(arguments);
        this.setRawValue(this.getRealValue());
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.bindValues(this.ownerCt.grid.selection.get(this.ownerCt.column.dataIndex), this.ownerCt.grid.selection.get(this.ownerCt.column.dataIndex));
            }
        }
        this.selectText();
    },

    onBlur: function() {
        this.callParent(arguments);
        if (Ext.isEmpty(this.getDisplayValue())) {
            this.clear();
        }
        else {
            this.setRawValue(this.getDisplayValue());
        }
    },

    onSearch: function() {
        this.openHelperWin();
    },

    onClear: function() {
        this.clear();
        this.fireEvent('setcallbackvalue', this, null);
    },

    callbackPopup: function(params) {
        this.setSelectedData(params);
        this.fireEvent('setcallbackvalue', this, params);
        Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(this, 'SkipEnterKeyCheck');
    },

    getHelperWin: function(viewName, autoSearch) {
        return Ext.create(viewName, {
            helpOpts: {
                opener: this,
                searchValues: this.searchValues,
                autoSearch: autoSearch
            }
        });
    },

    callHelpAjax: function(url, sendData) {
        var field = this;
        Ext.Ajax.request({
            async: false,
            url: url,
            params: {
                sendData: sendData
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length === 1) {
                        field.callbackPopup(obj.data[0]);
                    }
                    else if (obj.data.length > 1) {
                        field.openHelperWin();
                        field.clear();
                    }
                    else {
                        field.openHelperWin();
                        field.clear();
                    }
                }
                else {
                    field.openHelperWin();
                    field.clear();
                }
            },
            fail: function () {
                field.openHelperWin();
                field.clear();
            }
        });
    },

    initComponent: function() {
        if(!this.allowBlank){
            //#FFFEFA
            // this.setFieldStyle('border-color: #faf4de;');
            this.setFieldLabel('<span style="color:red">*</span>'+this.getFieldLabel());
        }
        this.callParent(arguments);
    },



});
