var insertEmpty = function (tableid) {
    try {
        var dgdata = document.getElementById(tableid);
        var rows = dgdata.rows.length;
        var cells = dgdata.rows[0].cells.length;
        if (rows == 1) {
            var tr = "<tr><td colspan='" + cells + "'><div class='nocon'><ul><li>没查询到相关内容</li></ul></div></td></tr>"
            $('#' + tableid).append(tr);
        }
    }
    catch (e){ }
}