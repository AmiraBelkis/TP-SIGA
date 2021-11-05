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
        gammaA = document.getElementById('gammaA').value * Math.PI / 180
        gammaB = document.getElementById('gammaB').value * Math.PI / 180
        lamdaA = document.getElementById('lamdaA').value * Math.PI / 180
        lamdaB = document.getElementById('lamdaB').value * Math.PI / 180
    } else {

        lamdaA = ConvertDMS_DD(
            parseInt(document.getElementById('lamdaA_D').value),
            parseInt(document.getElementById('lamdaA_M').value),
            parseInt(document.getElementById('lamdaA_S').value)
        ) * Math.PI / 180
        lamdaB = ConvertDMS_DD(
            parseInt(document.getElementById('lamdaB_D').value),
            parseInt(document.getElementById('lamdaB_M').value),
            parseInt(document.getElementById('lamdaB_S').value)
        ) * Math.PI / 180
        gammaA = ConvertDMS_DD(
            parseInt(document.getElementById('gammaA_D').value),
            parseInt(document.getElementById('gammaA_M').value),
            parseInt(document.getElementById('gammaA_S').value)
        ) * Math.PI / 180
        gammaB = ConvertDMS_DD(
                parseInt(document.getElementById('gammaB_D').value),
                parseInt(document.getElementById('gammaB_M').value),
                parseInt(document.getElementById('gammaB_S').value)
            ) * Math.PI / 180
            /*  lamdaB = ConvertDMS_DD(document.getElementById('lamdaB_D').value,
                  document.getElementById('lamdaB_M').value,
                  document.getElementById('lamdaB_S').value) * Math.PI / 180
              gammaA = ConvertDMS_DD(document.getElementById('gammaA_D').value,
                  document.getElementById('gammaA_M').value,
                  document.getElementById('gammaA_S').value) * Math.PI / 180
              gammaB = ConvertDMS_DD(document.getElementById('gammaB_D').value,
                  document.getElementById('gammaB_M').value,
                  document.getElementById('gammaB_S').value) / 10 * Math.PI / 180*/
    }
    let d = 0,
        x, y;
    switch (document.getElementById('method').value) {
        case ('1'): //Pythagore "Works"
            const k = 1.852 * 60;
            lamdaA = lamdaA * 180 / Math.PI;
            lamdaB = lamdaB * 180 / Math.PI;
            x = (lamdaB - lamdaA) * Math.cos((gammaA + gammaB) / 2);
            gammaB = gammaB * 180 / Math.PI;
            gammaA = gammaA * 180 / Math.PI;
            y = gammaB - gammaA;
            let z = Math.sqrt(x * x + y * y);
            d = z * k;
            distance.value = Math.round(d * 100000) / 100000 + " Km";
            break;
        case ('2'): //sinus "Works"
            const RT = 6378.138;
            d = RT * Math.acos(Math.sin(gammaA) * Math.sin(gammaB) + Math.cos(gammaA) * Math.cos(gammaB) * Math.cos(lamdaB - lamdaA));
            distance.value = Math.round(d * 100000) / 100000 + " Km";
            break;
        case ('3'): //Haversine "Works"
            const k2 = 6378.138;
            x = Math.sin((gammaB - gammaA) / 2) * Math.sin((gammaB - gammaA) / 2);
            x += Math.cos(gammaA) * Math.cos(gammaB) * Math.sin((lamdaB - lamdaA) / 2) * Math.sin((lamdaB - lamdaA) / 2);
            y = 2 * Math.atan(Math.sqrt(x) / Math.sqrt(1 - x));
            d = k2 * y;
            distance.value = Math.round(d * 100000) / 100000 + " Km";
            break;
        default:
            console.log('no where');
            break;
    }
    direction.value = directions(lamdaA * 180 / Math.PI, lamdaB * 180 / Math.PI, gammaA * 180 / Math.PI, gammaB * 180 / Math.PI)
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

function directions(lamdaA, lamdaB, gammaA, gammaB) {
    const Direction = ["Nord", "Sud", "Est", "Ouest"];
    // de A vers B
    let i, j, lamda = lamdaB - lamdaA,
        gamma = gammaB - gammaA;
    if (lamda > 0) // vers l'est
        j = 0;
    else // vers l'ouest
        j = 1;
    if (gamma > 0) // vers nord
        i = 0;
    else // vers sud
        i = 1;
    // lamda > k1*gamma ==> E/o
    //  lamda < k2*gamma ==> N/s
    // else  k1*gamma > lamda > k2*gamma ==> les 2
    if (360 * Math.abs(lamda) < 180 * 0.8 * Math.abs(gamma)) // vers N/S
        return Direction[i]
    else if (360 * Math.abs(lamda) > 180 * 1.2 * Math.abs(gamma)) //vers E/O
        return Direction[j + 2]
    else
        return Direction[i] + "-" + Direction[j + 2]

}