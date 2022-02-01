var typingBool = false; 
var typingIdx=0; 
var liIndex = 0;
var liLength = $(".sec1 .typing-txt>ul>li").length;
// 타이핑될 텍스트를 가져온다 
var typingTxt = $(".sec1 .typing-txt>ul>li").eq(liIndex).text(); 
typingTxt=typingTxt.split(""); // 한글자씩 자른다. 
if(typingBool==false){ // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    var tyInt = setInterval(typing,100); // 반복동작 
}  
function typing(){ 
    if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
    $(".sec1 .typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
    typingIdx++; 
    } else{ //한문장이끝나면
    //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로 
        if(liIndex>=liLength-1){
            liIndex=0;
        }else{ 
            liIndex++; 
        } 
    //다음문장을 타이핑하기위한 셋팅
        typingIdx=0;
        typingBool = false; 
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
    //다음문장 타이핑전 1초 쉰다
        clearInterval(tyInt);
        setTimeout(function(){
            $(".typing").html('');
            tyInt = setInterval(typing,100);
        },2000);
    } 
}


// // 마우스 휠 이벤트 (1section당)
// var prevt = 0;
// $('section').on('mousewheel',function(e, delta){
//     if (delta>0) {
//         prevt = $(this).prev().offset().top
//     } else if (delta<0) {
//         prevt = $(this).next().offset().top
//     }
//     $('html').animate({
//         scrollTop:prevt
//     }, 1000)
// })


// 이지파이
var skillTop = $('#sec3').offset().top - $(window).height()
var arrChartColor = ['#6CAFD9', '#7CDAFA', '#699AFA', '#6AB8F7', '#3E90FA'];
var arrPercent = [90, 90, 70, 80, 50]

$(window).on('scroll', function(){
    $('#sec3 .skills').each(function(idx){
        // each문에는 무조건 function이 가로안에 나옴
        $(this).attr({'data-percent':arrPercent[idx]})
        $(this).easyPieChart({
            animate: 2000,       // 진행시간
            easing: 'easeOutBounce', // 속도함수
            barColor: arrChartColor[idx],   // 채워지는 색상
            trackColor: '#eee', // 트색 색상
            scaleColor: false, // 눈금선 색상
            lineCap:'round', // 선의 끝 모양(butt, round, square)
            lineWidth:20, // 선의 폭
            size:130, // 원형차트의 크기
            onStart:$.noop,
            onStop:$.noop,
            onStep: function(from, to, percent) {  
                $(this.el).find('.percent').text(Math.round(percent));
            }
            // onStep은 숫자 증가하는부분 (이대로 쓰면됨)
        })
    })
});

//슬릭슬라이더 플러그인 연결
$('.slide-group').slick({
    autoplay:false,
    speed:500,
    dots:true,
    prevArrow:'<button class="slick-arrow slick-prev"><i class="fas fa-arrow-circle-left"></i></button>',
    nextArrow : '<button class="slick-arrow slick-next"><i class="fas fa-arrow-circle-right"></i></button>',
    fade:false, 
    slidesToShow:3,
    slidesToScroll:1,
    responsive:[{
        breakpoint : 769,
        settings:{
            fade:true,
            arrows:false
        }
    }]
})

// 스크롤 시 동적효과
var wh0 = $('section').eq(0).offset().top
var wh1 = $('section').eq(1).offset().top                //section2
var wh2 = $('section').eq(2).offset().top
var wh3 = $('section').eq(3).offset().top+300
var wh4 = $('section').eq(4).offset().top                //section5
$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if (sct>50 &&sct<wh1 ) {
        $('#sec2').addClass('on')
    } else if (sct>wh1 && sct<wh2) {
        $('#sec3').addClass('on')
    } else if (sct>wh2 && sct<wh3) {
        $('#sec4').addClass('on').find('.slide li').css({background:'#d5efff'})
    } else if (sct>=wh3) {
        $('section:nth-child(5)').addClass('on')
    }
})