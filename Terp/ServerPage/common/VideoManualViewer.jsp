<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>TERP</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta http-equiv="Pragma" content="no-cache">
    <style type="text/css">
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .fluid-container {
            display: table;
            width: 100%;
            height: 100%;
            padding: 0;
        }
        .fluid-row {
            display: table-row;
        }
        .fluid-cell {
            display: table-cell;
            height: 100%;
            vertical-align: middle;
        }
        .centering {
            float: none;
            margin: 0 auto;
            text-align: center;
        }

        #pageHeader {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            padding: 10px;
            background-color: #ccc;
            color: #fff;
        }
        #playlist {
            float: left;
            width: 240px;
            margin: 0;
            padding: 0;
            height: 100%;
            background: #f0f0f0;
            border-right: 1px solid #ccc;
            overflow-y: auto;
        }
        #playlist dt {
            padding: 10px;
            font-weight: bold;
            background-color: #fff;
            color: #333;
        }
        #playlist dd {
            cursor: pointer;
            padding: 10px;
            margin-left: 10px;
        }
        #playlist dd:hover {
            color:blue;
            font-weight: bold;
        }
        #playerWrap {
            float: left;
            width: calc(100vw - 241px);
        }
        #player {
            width: 100%;
        }
    </style>
</head>
<body>

    <div class="fluid-container">
        <div class="fluid-row">
            <div id="mainWrap" style="height:100%;display:none;">
                <div id="pageHeader">동영상 매뉴얼</div>
                <div style="height:calc(100vh - 47px);">
                    <dl id="playlist"></dl>
                    <div id="playerWrap">
                        <video id="player" controls="controls" playsinline></video>
                    </div>
                </div>
            </div>
            <div class="fluid-cell" id="msgWrap" style="display:none;">
                <div class="centering"><h3>동영상 매뉴얼이 하나도 등록되어 있지 않습니다!</h3></div>
            </div>
        </div>
    </div>

    <script>

        var msgWrap = document.getElementById('msgWrap');
        var mainWrap = document.getElementById('mainWrap');
        var playlist = document.getElementById('playlist');
        var player = document.getElementById('player');
        var xhr = new XMLHttpRequest();
        var path = '/erpfiles/Manual/video/';

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(this.responseText);
                if (res.length === 0) {
                    msgWrap.style.display = 'block';
                }
                else {
                    mainWrap.style.display = 'block';
                    var html = '';
                    for(var g=0; g<res.length; g++) {
                        html = html + '<dt>' + res[g].groupName + '</dt>';
                        for(var i=0; i<res[g].items.length; i++) {
                            html = html + '<dd onclick="onClickPlayList(this)" data-fn="' + res[g].items[i].fileName + '">' + res[g].items[i].linkText + '</dd>';
                        }
                    }
                    playlist.innerHTML = html;
                }
            }
        };
        xhr.open("GET", path+'index.json', true);
        xhr.send();

        function onClickPlayList(el) {
            if (!player.paused) player.pause();
            if (el.dataset && el.dataset.fn && (el.dataset.fn.trim() !== '')) {
                player.src = path + el.dataset.fn.trim();
                player.play();
            }
        }

    </script>

</body>
</html>
