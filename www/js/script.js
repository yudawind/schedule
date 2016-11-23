
$(document).ready(function () {
    cal = '#cal02';
    calwek = $(cal+' .week .ald');
    calned = $(cal+' .week ul ul');
    lich = calned.children();
    $.getJSON("calendar.json", function(data){
        $('body').mouseup(function () {
            lich.off('mouseover')
        });
        function kras () {
            for (g=0;g<calned.length;g++){
                var a = calned.eq(g).children();
                var b = a.parent().parent().children().first();
                if (a.parent().children().hasClass('on')){
                    b.addClass('on')
                } else b.removeClass('on');
                var c = a.parent().children();
                var f = a.parent().parent().children().last().prev();
                var d=0;
                for (i=0;i<c.length;i++){
                    if (!c[i].classList.contains('on')) f.removeClass('on');
                    if (c[i].classList.contains('on')) {
                        d+=1;
                        f.removeClass('on');
                    }
                    if (d==24) f.addClass('on');
                }
            }
        }
        lich.mousedown(function () {
            $(this).toggleClass('on');
            kras ();
        });
        calned.mousedown(function () {
            $(cal+' .knopki').children().removeAttr("disabled");
            lich.on('mouseover',function () {
                $(this).toggleClass('on');
                kras ();
            });
        });
        calwek.mousedown(function () {
            if (!$(this).hasClass('on')){
                $(this).addClass('on');
                $(this).parent().children().last().children().addClass('on');
            } else {
                $(this).removeClass('on');
                $(this).parent().children().last().children().removeClass('on');
            }
        });
        function zaps (a,p) {
            for (i=0;i<a.length;i++){
                var bt=a[i].bt/60;
                var et=(a[i].et+1)/60;
                for (c=bt;c<et;c++){
                    calned.eq(p).children().eq(c).addClass('on');
                }
            }
        }
        zaps (data.mo,0);
        zaps (data.tu,1);
        zaps (data.we,2);
        zaps (data.th,3);
        zaps (data.fr,4);
        zaps (data.sa,5);
        zaps (data.su,6);
        kras ();
    });
});
function clearDay() {
    calned.children().removeClass('on');
    calwek.removeClass('on');
    calwek.prev().removeClass('on');
    $(cal+' .knopki').children().attr('disabled',true);
}
function saveDay() {
    var forJson = {"mo": [], "tu": [], "we": [], "th": [], "fr": [], "sa": [], "su": []};
    for(var i=0;i<calned.length;i++){
        var f = 0;
        for (var c=0;c<calned.eq(i).children().length;c++) {
            var b = calned.eq(i).children().eq(c);
            // console.log(c);
            if (b.hasClass('on')) {
                if (f==0){
                    bt=(c*60);
                    f=1;
                }
            } else if (f==1) {
                et = ((c)*60)-1;
                if (i==0) forJson.mo.push({"bt":bt,"et":et});
                if (i==1) forJson.tu.push({"bt":bt,"et":et});
                if (i==2) forJson.we.push({"bt":bt,"et":et});
                if (i==3) forJson.th.push({"bt":bt,"et":et});
                if (i==4) forJson.fr.push({"bt":bt,"et":et});
                if (i==5) forJson.sa.push({"bt":bt,"et":et});
                if (i==6) forJson.su.push({"bt":bt,"et":et});
                f = 0;
            }
            if (c==23&&f==1){
                et = ((c+1)*60)-1;
                if (i==0) forJson.mo.push({"bt":bt,"et":et});
                if (i==1) forJson.tu.push({"bt":bt,"et":et});
                if (i==2) forJson.we.push({"bt":bt,"et":et});
                if (i==3) forJson.th.push({"bt":bt,"et":et});
                if (i==4) forJson.fr.push({"bt":bt,"et":et});
                if (i==5) forJson.sa.push({"bt":bt,"et":et});
                if (i==6) forJson.su.push({"bt":bt,"et":et});
            }
        }

    }
    var str = JSON.stringify(forJson);
    console.log(str);
}