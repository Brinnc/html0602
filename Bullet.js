/*6-0) 총알을 정의*/
class Bullet extends GameObject {
    //7-1) 상속

    //총알이 한 발자국씩 앞으로 전진할 때마다, 
    //게임에 남아있는 적군들에 대해 충돌체크하기
    //충돌이라면? 둘(총알, 적군)다 소거
    //*죽는다(소거)는 의미: 화면에서 제거+배열명단에서 제거(동기화해야함)
    //원래 상위(부모)클래스의 것을 그대로 사용해도되지만
    //총알 입장에서는 상속받은 tick() 메서드는 충돌체크 로직이 없으므로,
    //업그레이드 할 필요가 있다 
    //이러한 메서드 정의 기법을 OOP에서는 오버라이딩(overriding)이라고 함

    //변화된 값을 이용하여 화면에 그래픽 처리(렌더링)
    render() {
        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";

        this.hitTest();

        //총알 객체가 if문을 만나지 않았다는 것은 바로 적군 개체와 충돌하지 않았다는 것임
        //이러한 총알은 화면 밖으로 나갔는지 여부를 따져보고 제거해야함
        if (this.x > 950) {
            //1.화면에서 제거
            //1)나제거
            this.container.removeChild(this.img);
            //2.배열에서 제거
            //1)내가 소속된 배열에서 제거
            let myIndex = bulletArray.indexOf(this); //총알이 있는 배열에서 현재 내(총알)가 몇번째 인덱스에 들어있는지 조사
            bulletArray.splice(myIndex, 1);
        }
    }

    hitTest() {
        this.x += this.velX;
        this.y += this.velY;

        //충돌 체크
        for (let i = 0; i < enemyArray.length; i++) {
            let result = collisionCheck(this, enemyArray[i]);

            if (result) { //충돌했다면
                // console.log(i + "번째 적군과 충돌함!!!");

                //1.화면에서 제거
                //1)나제거
                this.container.removeChild(this.img);
                //2)너제거
                this.container.removeChild(enemyArray[i].img);

                //2.배열에서 제거
                //1)내가 소속된 배열에서 제거
                let myIndex = bulletArray.indexOf(this); //총알이 있는 배열에서 현재 내(총알)가 몇번째 인덱스에 들어있는지 조사
                bulletArray.splice(myIndex, 1);
                //2)너가 소속된 배열에서 제거
                //충돌난 적군이 적군 배열에서 몇번째 들어있는지 조사
                let yourIndex = enemyArray.indexOf(enemyArray[i]);
                enemyArray.splice(yourIndex, 1);

                //점수 올리기
                setScore();

                break; //반복문 멈추기, 단 두 물체를 소거하지 않으면 존재하는 한 계속 충돌검사를 함
            }
        }
    }


}