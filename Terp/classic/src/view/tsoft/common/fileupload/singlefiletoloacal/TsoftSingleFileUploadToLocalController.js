/**
 * Created by jiscraft on 2016-03-10.
 */
Ext.define('Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftsinglefileuploadtolocal',

    /**
     * Called when the view is created
     */

    init: function(obj , saveType , param ) {
        var me = this;
        me.view = me.getView();
        if (!Ext.isEmpty(param)) {
            this.getView().setSaveType(saveType);
            this.getView().setKeyDataParam(param);

            this.getView().setTitle('파일업로드');

            if (this.getView().getSaveType() == "emp"){
                this.getView().setTitle('개인사진등록');
            }
            if (this.getView().getSaveType() == "sign"){
                this.getView().setTitle('서명등록');
            }
            if (this.getView().getSaveType() == "bom"){
                this.getView().setTitle('BOM도면등록');
            }
            if (this.getView().getSaveType() == "user"){
                this.getView().setTitle('사용자등록요청사진');
            }
            if (this.getView().getSaveType() == "material"){
                this.getView().setTitle('자재사진');
            }
            if (this.getView().getSaveType() == "eaform"){
                this.getView().setTitle('기안양식');
            }

        }


    },


    onSubmit: function() {
        var me =this ;
        var form = this.getView().down('[name=tsoftsearchform_emp]');

        var commonFn  = Terp.app.getController('TerpCommon');
        var loginCdc = commonFn.getUserInfo().cd_c;
        var loginIduser = commonFn.getUserInfo().id_user;

        if(form.isValid()){
            form.submit({
                url: '../ServerPage/sy/sy_singlefileupload.jsp',
                waitMsg: 'file uploading..',
                method: 'POST',
                //params: Ext.util.JSON.encode(form.getValues()),
                params: {
                  cdCFolder :loginCdc ,
                    detailFolder : this.getView().getSaveType(),
                    loginIduser : loginIduser

                },
                success: function(fp, res) {
                    var keyData = me.getView().getKeyDataParam();
                    var uploadType = me.getView().getSaveType();
                    console.log(uploadType);
                    var jsonResult = Ext.JSON.decode(res.response.responseText);
                    //console.log(jsonResult);
                    var msg = "upload file name : " + jsonResult.data[0].newFileName+"<br />";
                    msg += "upload file size : " + jsonResult.data[0].size;
                    if ( me.onAfterSuccess(   jsonResult.data[0].newFileName  , keyData ,  uploadType  ) ){
                        commonFn.toastMessage(msg , 'b');
                        if (me.view.callback) me.view.callback('/erpfiles/' + loginCdc + '/' + uploadType + '/' + jsonResult.data[0].newFileName);
                    }
                    else {
                        commonFn.toastMessage('저장실패', 'b');
                    }
                    me.closeView();
                },

                failure: function(form, res) {
                    var jsonResult = Ext.JSON.decode(res.response.responseText);
                    commonFn.toastMessage(jsonResult.msg , 'b');
                }
            });
        }
    },


    onAfterSuccess : function(newFile , keyData , uploadType ){
        //console.log(keyData);
        var param = {
          newFileName : newFile ,
            keyData : keyData ,
            uploadType : uploadType
        };
        var commonFn  = Terp.app.getController('TerpCommon');
        return commonFn.sqlExtcute('uploadSingleFile' , param );
    }
});