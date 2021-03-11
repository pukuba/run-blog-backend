export const mock1 = {
    content: `
# Hello
## Hello
### Hello 
#### Hello
##### Hello
###### Hello

- Hello
    - Hello
    - Hello

- Hi
    - Hi
`,
    category: "TEST",
    author: "Pukuba",
    tags: ['"Markdown"', '"mocha"'],
    title: "Test Mock1"
}

export const mock2 = {
    content: `
## ODM : Object-Document Mapper

NoSQL DB중 유명한 MongoDB를 node.js 에서 사용하다보면 Mongoose라는 라이브러리를 사용하는데, 이것이 ODM입니다. document DB를 지원하기위해 데이터를 변경하는 프로그래밍 기법.

객체 관계로 정의한 내용을 NoSQL 형태로 매핑 해주는 도우미 역할을 함.

<hr>

## ORM : Object Relational Mapper

객체와 관계형 DB에 자동으로 매핑해주는 것을 말함.

ORM을 통하여 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결함.

- 장점
    - 객체 지향적인 코드로 인해 더 직관적.
    - ORM을 사용하여 SQL을 사용하지 않고 데이터를 조작할수 있어 비지니스 로직에 집중할 수 있음.
    - 코드가 짧아짐, 코드의 가독성이 올라감, 재사용 및 유지보수 성이 올라감
    - 매핑 정보가 명확하여 개체-관계 모델 를 보는 것에 대한 의존도를 낮출 수 있음.
    - Object에 집중함으로 DBMS를 교체하는 거대한 작업에도 비교적 적은 리스크.

- 단점
    - N + 1 Problem.
    - 자주 사용되는 대형 쿼리를 위한 튜닝, 잘못 구현된 경우 속도에 문제.
    - 프로젝트의 복잡성이 커질수록 난이도가 상승.

<hr>
`,
    category: "Interview",
    author: "pukuba",
    tags: ['"back-end","mocha"'],
    title: "ODM ? ORM ?"
}