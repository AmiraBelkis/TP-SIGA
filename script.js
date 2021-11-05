const LA = document.getElementById('LA'),
    LA2 = document.getElementById('LA2'),
    GA = document.getElementById('GA'),
    GA2 = document.getElementById('GA2'),
    LB = document.getElementById('LB'),
    LB2 = document.getElementById('LB2'),
    GB = document.getElementById('GB'),
    GB2 = document.getElementById('GB2'),
    distance = document.getElementById('D'),
    direction = document.getElementById('dir');


function calculat() {
    let lamdaA, lamdaB, gammaB, gammaA;
    if (document.getElementById('dd').checked) {
        gammaA = document.getElementById('gammaA').value * 3.14 / 180
        gammaB = document.getElementById('gammaB').value * 3.14 / 180
        lamdaA = document.getElementById('lamdaA').value * 3.14 / 180
        lamdaB = document.getElementById('lamdaB').value * 3.14 / 180
    } else {

        lamdaA = ConvertDMS_DD(document.getElementById('lamdaA_D').value,
            document.getElementById('lamdaA_M').value,
            document.getElementById('lamdaA_S').value) * 3.14 / 180
        lamdaB = ConvertDMS_DD(document.getElementById('lamdaB_D').value,
            document.getElementById('lamdaB_M').value,
            document.getElementById('lamdaB_S').value) * 3.14 / 180
        gammaA = ConvertDMS_DD(document.getElementById('gammaA_D').value,
            document.getElementById('gammaA_M').value,
            document.getElementById('gammaA_S').value) * 3.14 / 180
        gammaB = ConvertDMS_DD(document.getElementById('gammaB_D').value,
            document.getElementById('gammaB_M').value,
            document.getElementById('gammaB_S').value) * 3.14 / 180


    }
    let d = 0;
    switch (document.getElementById('method').value) {
        case ('1'): //Pythagore
            const k = 1.852 * 60;
            let x = (lamdaB - lamdaA) * Math.cos((gammaA + gammaB) / 2);
            let y = gammaB - gammaA;
            let z = Math.sqrt(x * x + y * y);
            d = z * k;
            distance.value = Math.round(d * 10000) / 10000 + " Km";
            break;
        case ('2'): //sinus
            const RT = 6378.138;
            d = RT * Math.acos(Math.sin(lamdaA) * Math.sin(lamdaB) + Math.cos(lamdaA) * Math.cos(lamdaB) * Math.cos(gammaB - gammaA));
            distance.value = Math.round(d * 10000) / 10000 + " Km";
            break;
        case ('3'): //Haversine

            const k2 = 6378.138;
            x = Math.sin((gammaB - gammaA) / 2) * Math.sin((gammaB - gammaA) / 2);
            x += Math.cos(gammaA) * Math.cos(gammaB) * Math.sin((lamdaB - lamdaA) / 2) * Math.sin((lamdaB - lamdaA) / 2);
            y = 2 * Math.atan(Math.sqrt(x) / Math.sqrt(1 - x));
            d = k2 * y;
            distance.value = Math.round(d * 10000) / 10000 + " Km";
            break;
        default:
            console.log('no where');
            break;
    }
}

function DD_DMS(n) {
    switch (n) {
        case (1):
            LA.style.display = 'flex';
            GA.style.display = 'flex';
            LB.style.display = 'flex';
            GB.style.display = 'flex';
            LA2.style.display = 'none';
            GA2.style.display = 'none';
            LB2.style.display = 'none';
            GB2.style.display = 'none';
            break;
        case (2):
            LA2.style.display = 'flex';
            GA2.style.display = 'flex';
            LB2.style.display = 'flex';
            GB2.style.display = 'flex';
            LA.style.display = 'none';
            GA.style.display = 'none';
            LB.style.display = 'none';
            GB.style.display = 'none';
            break;
    }
}

function ConvertDMS_DD(a, b, c) {
    let x;
    let y = (b + c / 60) / 60;
    if (a > 0) {
        x = a + y;
    } else {
        let u = a * (-1);
        let f = u + y;
        x = f * (-1);
    }
    return x;
}