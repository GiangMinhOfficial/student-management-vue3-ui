class Khoa {
  constructor(maKhoa, tenKhoa) {
    this.maKhoa = maKhoa || '';
    // if (maKhoa) {
    this.tenKhoa = tenKhoa;
    // }
  }

  // getTenKhoa(maKhoa) {
  //   const khoa = khoas[maKhoa];
  //   return khoa || '';
  // }
}

const khoas = {
  1: 'Khoa học Tự nhiên',
  2: 'Kinh tế',
  3: 'Điện tử Viễn thông',
  4: 'Ngoại ngữ',
  5: 'Kỹ thuật Máy tính',
  6: 'Y học',
  7: 'Luật',
  8: 'Khoa học xã hội',
  9: 'Quản trị kinh doanh',
  10: 'Công nghệ Thông tin',
};

export default Khoa;
export { khoas };
