/**
 * Created by jiscraft on 2016-06-03.
 */
Ext.define('Terp.view.tsoft.common.glyphs.Glyphs', {
    singleton: true,

    DEFAULT_FONT_FAMILY: 'FontAwesome',

    BOOKMARK: 0xf02e,
    ENVELOPE: 0xf0e0,
    LOCK: 0xf023,
    PENCIL: 0xf040,
    MENU: 0xf0c9
});

Ext.QuickTips.init();
Ext.setGlyphFontFamily(Terp.view.tsoft.common.glyphs.Glyphs.DEFAULT_FONT_FAMILY);

Ext.define('Terp.view.tsoft.common.glyphs.GlyphTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.glyphtool',

    requires: [
        'Terp.view.tsoft.common.glyphs.Glyphs'
    ],

    //type: default ,
    //type: Terp.view.tsoft.common.glyphs.Glyphs.PENCIL:
    type: Terp.view.tsoft.common.glyphs.Glyphs.MENU,
    renderTpl: ['<span role="img" id="{id}-toolEl" class="x-btn-icon-el  x-btn-glyph x-menu-tool" unselectable="on" style="font-family:FontAwesome;">&#{glyph}</span>'],

    initComponent: function() {
        var me = this,
            glyphParts;
        me.callParent();

        if (typeof me.type === 'string') {
            glyphParts = me.type.split('@');
            me.type = glyphParts[0];
        }

        Ext.applyIf(me.renderData, {
            baseCls: me.baseCls,
            blank: Ext.BLANK_IMAGE_URL,
            glyph: me.type
        });
    }

});
