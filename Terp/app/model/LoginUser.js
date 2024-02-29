/**
 * Created by jiscraft on 2016-01-16.
 */
Ext.define('Terp.model.LoginUser', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',

    ],

    fields: [
        'id_user', 'nm_user', 'dc_pw', 'dt_pwchange', 'fg_p' , 'cd_c','cd_e','cd_p','dc_email', 'dc_mobile', 'yn_use', 'dt_insert','nm_c' ,'fg_sy030'
    ],


    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            read: '../ServerPage/login/UserAuthenticate.jsp'
            //create: 'resources/data/itbiz/Users.json?create',
            //update: 'resources/data/itbiz/UsersUpdate.json?update',
            //destroy: 'resources/data/itbiz/Users.json?destroy'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            allowSingle: false  // 배열 하나로 전달.
        },
        reader: {             // #11
            type: 'json',
            rootProperty: 'data'
        }
    }
});