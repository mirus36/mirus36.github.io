const removeCursor = () => {
    const cursor = document.getElementsByClassName('typed-cursor')[0]
    cursor.parentNode.removeChild(cursor)
}


new Typed('#type_end_1', {
    stringsElement: '#type_begin_1',
    startDelay: 500,
    typeSpeed: 60,
    onStringTyped: () => {
        removeCursor()
        document.getElementById('result_1').style.display = ''
        document.getElementById('action_2').style.display = ''
        new Typed('#type_end_2', {
            stringsElement: '#type_begin_2',
            startDelay: 1500,
            typeSpeed: 60,
            onStringTyped: () => {
                removeCursor()
                document.getElementById('result_2').style.display = ''
                document.getElementById('action_3').style.display = ''
                new Typed('#type_end_3', {
                    stringsElement: '#type_begin_3',
                })
            }
        })
    }
})