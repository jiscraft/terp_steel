/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaDocViewer.EaDocViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eadocviewer',

    control: {
        'component[reference=docviewer_iframe]': {
            painted: 'onPainted_Iframe'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;
        me.PreviewCtrl = me.view.PreviewCtrl;
        me.PreviewView = me.PreviewCtrl.view;

        me.view.lookup('docviewer_title').setHtml(me.view.SelectedRecord.data.cd_doc);
    },

    onPainted_Iframe: function(component, element) {
        var me = this;

        if (Ext.isEmpty(me.view.SelectedRecord.data.no_af)) {
            Ext.toast('기안내용 파일을 찾을 수 없습니다.');
            return;
        }

        Ext.Ajax.request({
            async: false,
            url: Ext.String.format('{0}/{1}_{2}.html', me.view.SelectedRecord.data.dc_save_path, me.view.SelectedRecord.data.no_af, me.view.SelectedRecord.data.id_row_src),
            success: function (res) {
                var cont_html = res.responseText;
                me.view.iframe = document.getElementById('contents');
                me.view.iframeDocument = me.view.iframe.contentDocument;
                me.view.iframeDocument.open();
                me.view.iframeDocument.writeln('<html>');
                me.view.iframeDocument.writeln('<head>');
                me.view.iframeDocument.writeln('</head>');
                me.view.iframeDocument.writeln('<body>');
                me.view.iframeDocument.writeln(cont_html);
                me.view.iframeDocument.writeln('</body>');
                me.view.iframeDocument.writeln('</html>');
                me.view.iframeDocument.close();

                me.view.iframeBody = me.view.iframeDocument.body;
                var screenWidth = me.view.iframeBody.clientWidth;
                var contentWidth = me.view.iframeBody.scrollWidth;
                var zoomRatio = screenWidth / contentWidth;
                if (screenWidth < contentWidth) {
                    me.view.iframeBody.style.zoom = zoomRatio;
                }
            }
        });
    },

    onTap_BackBtn: function() {
        var me = this;
        me.MainCtrl.setCardAnim('slide', 'right', 500);
        me.MainView.setActiveItem(me.PreviewView);
        me.MainView.remove(me.view);
    }

});