import Khoa from './khoa';

class Student {
  constructor(maSv, tenSv, ngaySinh, gioiTinh, maKhoa, tenKhoa) {
    this.maSv = maSv || '';
    this.tenSv = tenSv || '';
    this.ngaySinh = ngaySinh || '';
    this.gioiTinh = gioiTinh;
    this.khoa = new Khoa(maKhoa, tenKhoa);
  }
}

const students = [
  new Student(1, 'Nguyễn Văn An', '15/03/2000', true, 1),
  new Student(2, 'Trần Thị Bình', '22/07/2001', false, 2),
  new Student(3, 'Lê Minh Châu', '10/11/1999', true, 3),
  new Student(4, 'Phạm Hoàng Dung', '05/09/2002', false, 4),
  new Student(5, 'Vũ Quang Huy', '30/06/2000', true, 5),
  new Student(6, 'Ngô Thị Kim', '18/12/2001', false, 6),
  new Student(7, 'Lý Văn Linh', '08/02/1998', true, 7),
  new Student(8, 'Trần Minh Ngọc', '20/09/2002', true, 8),
  new Student(9, 'Bùi Thị Mai', '12/04/2001', false, 9),
  new Student(10, 'Hoàng Xuân Phúc', '25/10/1999', true, 10),
];

export default Student;
export { students };
