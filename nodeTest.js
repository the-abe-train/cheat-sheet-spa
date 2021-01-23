function testAtan2() {
    let theta = 0;
    while (theta <= Math.PI * 2) {
        const x = 1;
        const y = x*Math.tan(theta);
        const res = Math.atan2(y, x);
        console.log(`${Math.floor(theta/Math.PI * 8)}/4*PI: ${res}`);
        theta += Math.PI / 8
    }
}

testAtan2()