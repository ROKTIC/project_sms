
/**
 * 학생 전체 목록 출력해주기
 */
const printStudents = function (students) {
  const tbody = document.querySelector('table tbody[name=table-tbody]');
  const tfoot = document.querySelector('table tfoot[name=table-tfoot]');
  let tbodyContents = '';
  let tfootContents = '';
  let total = 0;
  let average = 0.0;

  setRanks(students);
  
  students.forEach(student => {
    tbodyContents = tbodyContents + `
    <tr>
      <th>${student.ssn}</th>
      <td>${student.name}</td>
      <td>${student.korean}</td>
      <td>${student.english}</td>
      <td>${student.math}</td> 
      <td>${student.getSum()}</td>
      <td>${student.getAverage()}</td>
      <td>${student.getRank()} </td>
    </tr>
    `
    total = total + student.getSum();
    average = average + parseFloat(student.getAverage());
  });

  tbody.innerHTML = tbodyContents;

  // 총점과 총 평균 구하기
  students.forEach(student => {
    tfootContents = `
          <tr>
            <th scope="row"></th>
            <th colspan="4"><i class="fa-solid fa-school"></i>&nbsp;&nbsp;&nbsp;전체 평균</th>
            <td>${(total / students.length).toFixed(1)}</td>
            <td>${(average / students.length).toFixed(1)}</td>
            <td></td>
          </tr>
    `
  });
  tfoot.innerHTML = tfootContents;
}

/**
 * 학생 등록 
 */
const addStudents = function (studentService) {

  const ssn = document.querySelector('#input-ssn');
  const name = document.querySelector('#input-name');
  const korean = document.querySelector('#korean-score');
  const english = document.querySelector('#english-score');
  const math = document.querySelector('#math-score');
  const tbody = document.querySelector('table tbody[name=table-tbody]');

  if (Validator.isEmpty(ssn.value) || !Validator.isNumber(ssn.value)) {
    alert("학번 입력 조건을 확인해주세요.");

    ssn.value = '';
    ssn.focus();
    return;
  }
  if (Validator.isEmpty(name.value) || Validator.isNumber(name.value)) {
    alert("이름 입력 조건을 확인해주세요.");

    name.value = '';
    name.focus();
    return;
  }
  if (Validator.isEmpty(korean.value) || !Validator.isNumber(korean.value) || korean.value > 100 || korean.value < 0) {
    alert("국어점수 입력 조건을 확인해주세요.");

    korean.value = '';
    korean.focus();
    return;
  }
  if (Validator.isEmpty(english.value) || !Validator.isNumber(english.value) || english.value > 100 || english.value < 0) {
    alert("영어점수 입력 조건을 확인해주세요.");
    english.value = '';
    english.focus();
    return;
  }
  if (Validator.isEmpty(math.value) || !Validator.isNumber(math.value) || math.value > 100 || math.value < 0) {
    alert("수학점수 입력 조건을 확인해주세요.");

    math.value = '';
    math.focus();
    return;
  }

  const newStudent = new Student(ssn.value, name.value, parseInt(korean.value), parseInt(english.value), parseInt(math.value));

  studentService.addStudent(newStudent);

  // const list = document.createElement('tr');
  // list.innerHTML = `<td>${ssn.value}</td><td>${name.value}</td>
  //   <td>${korean.value}</td><td>${english.value}</td><td>${math.value}</td>
  //   <td>${newStudent.getSum()}</td><td>${newStudent.getAverage()}</td>`

  ssn.value = '';
  name.value = '';
  korean.value = '';
  english.value = '';
  math.value = '';

  // tbody.appendChild(list);
  alert('학생 등록이 완료되었습니다!');
  printStudents(studentService.findAll());
}

/**
 * 학생 삭제
 * splice, 새로 들어온 데이터는 삭제 되는데 더미 데이터가 삭제가 안됨
 */
const deleteStudent = function (studentService) {
  const name = document.querySelector('#input-name').value;
  const ssn = document.querySelector('#input-ssn').value;
  const students = studentService.findAll();

  // 학번, 이름으로 삭제

  for (let i = 0; i < students.length; i++) {
    
    if (ssn === students[i].ssn && name === students[i].name) {
      students.splice(i, 1);
      ssn.value = '';
      name.value = '';
      alert('학생 삭제가 완료되었습니다!');
      printStudents(students);
      return;
    }
  }
  alert('데이터가 존재하지 않습니다. 학번과 이름을 다시 확인해주세요.');
}

/**
 * 학생 검색
 * 검색해서 나온 내용들만의 총점과 평균을 구하는 건 add 할 때의 코드와 똑같아서 그대로 붙혀도 되기는 함.
 */
const searchStudent = function (studentService, choiceSelectBox) {
  const searchInput = document.querySelector('#search-input').value;
  const tbody = document.querySelector('table tbody[name=table-tbody]');
  const tfoot = document.querySelector('table tfoot[name=table-tfoot]');
  const students = studentService.findAll();

  // 공백 시 전체검색
  if (searchInput.trim() === '') {
    tbody.innerHTML = '';
    printStudents(students);

    return;
  }
  // selectbox 조건 (학번, 이름)
  if (choiceSelectBox === 'ssn') {
    let list = '';
    students.forEach(student => {
      if (parseInt(searchInput) === parseInt(student.ssn)) {
        list = list + `
      <tr>
        <th>${student.ssn}</th>
        <td>${student.name}</td>
        <td>${student.korean}</td>
        <td>${student.english}</td>
        <td>${student.math}</td>
        <td>${student.getSum()}</td>
        <td>${student.getAverage()}</td>
        <td> ${student.getRank()} </td>
      </tr>
      `
        tbody.innerHTML = list;
      }
    });
  } else if (choiceSelectBox === 'name') {
    let list = '';
    students.forEach(student => {
      if ((searchInput) === (student.name)) {
        list = list + `
      <tr>
        <th>${student.ssn}</th>
        <td>${student.name}</td>
        <td>${student.korean}</td>
        <td>${student.english}</td>
        <td>${student.math}</td>
        <td>${student.getSum()}</td>
        <td>${student.getAverage()}</td>
        <td>${student.getRank()} </td>
      </tr>
      `
        tbody.innerHTML = list;
      }
    });
  }
  students.forEach(student => {
    tfootContents = `
          <tr>
            <th scope="row"></th>
            <th colspan="4"><i class="fa-solid fa-school"></i>&nbsp;&nbsp;&nbsp;</th>
            <td> <i class="fa-brands fa-js"></i> </td>
            <td> <i class="fa-brands fa-js"></i> </td>
            <td></td>
          </tr>
    `
  });
  tfoot.innerHTML = tfootContents;
}

/**
 * 조건순 정렬
 */
const sortList = function (select, studentService) {
  const students = studentService.findAll();

  if (select === '학번') {
    students.sort((a, b) =>
      parseInt(a.ssn) - parseInt(b.ssn)
    );
  } else if (select === '이름') {
    students.sort((a, b) =>
      a.name.charCodeAt(0) - b.name.charCodeAt(0)
    );
    console.log(students);
  }
  else if (select === '총점') {
    students.sort((a, b) =>
      b.getSum() - a.getSum()
    );
    console.log(students);
  }
  printStudents(students);
}

/**
 * 순위 구하기
 */
const setRanks = function (students) {
  let rank = 1;
  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < students.length; j++) {
      if (students[i].getSum() < students[j].getSum()) {
        rank = rank + 1;
      }
    }
    students[i].setRank(rank);
    rank = 1;
  }
}

/* --------------------------------------------------------------------- */
const eventRegister = function () {

  let studentService = null;

  window.addEventListener('load', function () {
    studentService = new StudentService();

    // 더미 데이터
    studentService.addStudent(new Student('12', "윤더미", 50, 50, 90));
    studentService.addStudent(new Student('11', "박더미", 95, 100, 90));
    studentService.addStudent(new Student('18', "김더미", 53, 95, 100));
    studentService.addStudent(new Student('13', "최더미", 95, 76, 95));
    studentService.addStudent(new Student('17', "이더미", 30, 95, 95));
    studentService.addStudent(new Student('15', "강더미", 95, 10, 79));
    studentService.addStudent(new Student('14', "한더미", 60, 36, 67));
    studentService.addStudent(new Student('16', "유더미", 100, 100, 98));
    studentService.addStudent(new Student('19', "더더미", 70, 50, 38));

    // 전체 학생 목록 출력
    const students = studentService.findAll();
    printStudents(students);
  });

  // 학생 추가 버튼
  document.querySelector('#add-btn').addEventListener('click', (event) => {
    addStudents(studentService);
  });

  // 학생 삭제 버튼
  document.querySelector('#delete-btn').addEventListener('click', (event) => {
    deleteStudent(studentService);
  });

  // 검색 버튼
  document.querySelector('#search-select').addEventListener('change', () => {
    const choiceSelectBox = document.querySelector('#search-select').value;
    console.log(choiceSelectBox);

    document.querySelector('#search-input-btn').addEventListener('click', () => {
      searchStudent(studentService, choiceSelectBox);
    });
  });

  // 정렬
  document.querySelector('#sort-select').addEventListener('change', () => {
    const select = document.querySelector('#sort-select').value;
    sortList(select, studentService);
  });
}

function main() {
  eventRegister();

}
main();

