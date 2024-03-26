/**
 * 학생 클래스
 */
function Student(ssn, name, korean, english, math) {

  this.ssn = ssn;
  this.name = name;
  this.korean = korean;
  this.english = english;
  this.math = math;
  this.rank = 1;
}

// Student.prototype 객체에 기능(메소드) 추가
Student.prototype.getSum = function () {
  return (this.korean + this.english + this.math);
}
Student.prototype.getAverage = function () {
  return (this.getSum() / 3).toFixed(1);   // 소수점 1자리
}
Student.prototype.getRank = function () {
  return this.rank;
}

Student.prototype.setRank = function (rank) {
  this.rank = rank;
}

// Object의 toString() 재정의(Overriding)
Student.prototype.toString = function () {
  return `${this.ssn}\t${this.name}\t${this.korean}\t${this.english}\t${this.math}\t${this.getSum()}\t${this.getAverage()}\t`;
}

