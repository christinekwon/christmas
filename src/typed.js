function type() {
    let message0 = "...";
    let message1 = "hi there ~";
    let message2 = "nice to meet you ! :)";
    let message3 = "my name is christine minjae kwon";
    let message4 = "and i am a 21 y/o digital creative";
    let message5 = "currently based in seoul, korea";
    let message6 = "click on any of the folders to view my projects ~";
    var typed = new Typed('.mac-text', {
        strings: [message0, message1, message2, message3, message4, message5, message6],
        // 25 is good
        typeSpeed: 25,
        showCursor: false,
        cursorChar: '|',
        autoInsertCss: true,
    });
}