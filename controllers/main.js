// Hàm domID:
const domID = (id) => document.querySelector(id);

// Call API:
const getUser = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })

    promise
        .then((result) => {
            renderUser(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getUser();

// Hàm render ra giao diện:
const renderUser = (arr) => {
    let htmlContent = '';
    arr.forEach((ele, index) => {
        htmlContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${ele.loaiNguoiDung}</td>
                <td>${ele.hoTen}</td>
                <td>${ele.diaChi}</td>
                <td>${ele.ma}</td>
                <td>${ele.email}</td>
                <td>${ele.diemToan}</td>
                <td>${ele.diemLy}</td>
                <td>${ele.diemHoa}</td>
                <td>${(((Number(ele.diemToan) + Number(ele.diemLy) + Number(ele.diemHoa)) / 3)) || '-'}</td>
                <td>${ele.soNgayLamViec}</td>
                <td>${ele.luongTheoNgay}</td>
                <td>${(ele.soNgayLamViec * ele.luongTheoNgay) || '-'}</td>
                <td>${ele.tenCongTy}</td>
                <td>${ele.triGiaHoaDon}</td>
                <td>${ele.danhGia}</td>
                <td style="min-width: 150px">
                    <div>
                        <button
                            class="btn btn-success"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onclick= "editUser(${ele.id})"
                        >
                        Edit</button>

                        <button 
                            class="btn btn-danger"
                            data-toggle="modal"
                            data-target="#modelConfirmDelete"
                            onclick = "getID(${ele.id})"
                        >
                        Delete</button>
                    </div>
                </td>
            </tr>`
    });

    domID('#tbodyList').innerHTML = htmlContent;
}

// Render Modal:
domID('#loaiNguoiDung').onchange = () => {
    let user = domID('#loaiNguoiDung').value;

    if (user === 'Sinh viên') {
        domID('#htmlNguoiDung').innerHTML = `
                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Toán</label>
                      <input type="text" class="form-control" id="diemToan" name="diemToan" placeholder="Điểm Toán" required>
                      <span class="sp-thongbao text-danger" id="spanDiemToan"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Lý</label>
                      <input type="text" class="form-control" id="diemLy" name="diemLy" placeholder="Điểm Lý" required>
                      <span class="sp-thongbao text-danger" id="spanDiemLy"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Hóa</label>
                      <input type="text" class="form-control" id="diemHoa" name="diemHoa" placeholder="Điểm Hóa"
                        required>
                      <span class="sp-thongbao text-danger" id="spanDiemHoa"></span>
                    </div>`

    } else if (user === 'Giảng viên') {
        domID('#htmlNguoiDung').innerHTML = `
                    <div class="col-md-6 mb-3">
                      <label for="tenMon" class="font-weight-bold">Số ngày làm việc</label>
                      <input type="text" class="form-control" id="soNgayLamViec" name="soNgayLamViec" placeholder="Số ngày làm việc"
                        required>
                      <span class="sp-thongbao text-danger" id="spanSoNgayLamViec"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label for="tenMon" class="font-weight-bold">Lương theo ngày</label>
                      <input type="text" class="form-control" id="luongTheoNgay" name="luongTheoNgay" placeholder="Lương theo ngày" required>
                      <span class="sp-thongbao text-danger" id="spanluongTheoNgay"></span>
                    </div>`

    } else if (user === 'Khách hàng') {
        domID('#htmlNguoiDung').innerHTML = `
        <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Tên công ty</label>
                      <input type="text" class="form-control" id="tenCongTy" name="tenCongTy" placeholder="Tên công ty" required>
                      <span class="sp-thongbao text-danger" id="spanTenCongTy"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Trị giá hóa đơn</label>
                      <input type="text" class="form-control" id="triGiaHoaDon" name="triGiaHoaDon" placeholder="Trị giá hóa đơn" required>
                      <span class="sp-thongbao text-danger" id="spanTriGiaHoaDon"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Đánh giá</label>
                      <select class="custom-select d-block w-100" id="danhGia" name="danhGia" required>
                        <option value="">Đánh giá</option>
                        <option value="Tốt">Tốt</option>
                        <option value="Khá">Khá</option>
                        <option value="Trung bình">Trung bình</option>
                        <option value="Tệ">Tệ</option>
                      </select>
                      <span class="sp-thongbao text-danger" id="spanDanhGia"></span>
                    </div>`
    } else {
        domID('#htmlNguoiDung').innerHTML = ''
    }
}

// Lấy thông tin từ người dùng:
const layThongTinNguoiDung = () => {
    const elements = document.querySelectorAll('#loaiNguoiDung, #userForm input, #userForm select');

    let user = {};

    elements.forEach((ele) => {
        const { name, value } = ele;

        user[name] = value;
    })

    let UserOOP = {};

    let loaiNguoiDung = user.loaiNguoiDung;

    if (loaiNguoiDung === 'Sinh viên') {
        const { hoTen, diaChi, ma, email, diemToan, diemLy, diemHoa } = user;
        const soNgayLamViec = '-';
        const luongTheoNgay = '-';
        const tenCongTy = '-';
        const triGiaHoaDon = '-';
        const danhGia = '-'
        UserOOP = new Person(loaiNguoiDung, hoTen, diaChi, ma, email, diemToan, diemLy, diemHoa, soNgayLamViec, luongTheoNgay, tenCongTy, triGiaHoaDon, danhGia)
    } else if (loaiNguoiDung === 'Giảng viên') {
        const { hoTen, diaChi, ma, email, soNgayLamViec, luongTheoNgay } = user;
        const diemToan = '-';
        const diemLy = '-';
        const diemHoa = '-';
        const tenCongTy = '-';
        const triGiaHoaDon = '-';
        const danhGia = '-'
        UserOOP = new Person(loaiNguoiDung, hoTen, diaChi, ma, email, diemToan, diemLy, diemHoa, soNgayLamViec, luongTheoNgay, tenCongTy, triGiaHoaDon, danhGia)
    } else if (loaiNguoiDung === 'Khách hàng') {
        const { hoTen, diaChi, ma, email, tenCongTy, triGiaHoaDon, danhGia } = user;
        const diemToan = '-';
        const diemLy = '-';
        const diemHoa = '-';
        const soNgayLamViec = '-';
        const luongTheoNgay = '-';
        UserOOP = new Person(loaiNguoiDung, hoTen, diaChi, ma, email, diemToan, diemLy, diemHoa, soNgayLamViec, luongTheoNgay, tenCongTy, triGiaHoaDon, danhGia)
    }

    // Validation:
    var isValid = true;

    // ---- Kiểm tra Họ tên (không đc bỏ trống, phải là chữ):
    isValid &= kiemTraChieuDaiChuoi(
        UserOOP.hoTen,
        1,
        undefined,
        '#spanHoTen',
        'Họ tên không được để trống'
    ) && kiemTraDinhDangChuoi(
        UserOOP.hoTen,
        /^[a-zA-Z _ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
        '#spanHoTen',
        'Họ tên phải là chữ'
    )

    // ---- Kiểm tra địa chỉ (không đc bỏ trống):
    isValid &= kiemTraChieuDaiChuoi(
        UserOOP.diaChi,
        1,
        undefined,
        '#spanDiaChi',
        'Địa chỉ không được để trống'
    )

    // ---- Kiểm tra mã (không đc bỏ trống, phải là số, có 2 ký tự):
    isValid &= kiemTraChieuDaiChuoi(
        UserOOP.ma,
        1,
        undefined,
        '#spanMa',
        'Địa chỉ không được để trống'
    ) && kiemTraDinhDangChuoi(
        UserOOP.ma,
        /^[0-9]+$/,
        '#spanMa',
        'Mã phải là số'
    ) && kiemTraChieuDaiChuoi(
        UserOOP.ma,
        2,
        2,
        '#spanMa',
        'Mã phải có 2 ký tự'
    )

    // ---- Kiểm tra email (không đc bỏ trống, đúng định dạng):
    isValid &= kiemTraChieuDaiChuoi(
        UserOOP.email,
        1,
        undefined,
        '#spanEmail',
        'Email không được để trống'
    ) && kiemTraDinhDangChuoi(
        UserOOP.email,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        '#spanEmail',
        'Email chưa đúng định dạng'
    )

    // ---- Kiểm tra điểm toán lý hóa (không đc bỏ trống, phải là số, từ 0 đến 10):
    if (loaiNguoiDung === 'Sinh viên') {
        // Toán:
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.diemToan,
            1,
            undefined,
            '#spanDiemToan',
            'Điểm không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.diemToan,
            /^[0-9]+$/,
            '#spanDiemToan',
            'Điểm phải là số'
        ) && kiemTraGiaTriChuoi(
            UserOOP.diemToan,
            0,
            10,
            '#spanDiemToan',
            'Điểm phải từ 0 đến 10'
        )

        // Lý:
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.diemLy,
            1,
            undefined,
            '#spanDiemLy',
            'Điểm không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.diemLy,
            /^[0-9]+$/,
            '#spanDiemLy',
            'Điểm phải là số'
        ) && kiemTraGiaTriChuoi(
            UserOOP.diemLy,
            0,
            10,
            '#spanDiemLy',
            'Điểm phải từ 0 đến 10'
        )

        // Hóa:
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.diemHoa,
            1,
            undefined,
            '#spanDiemHoa',
            'Điểm không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.diemHoa,
            /^[0-9]+$/,
            '#spanDiemHoa',
            'Điểm phải là số'
        ) && kiemTraGiaTriChuoi(
            UserOOP.diemHoa,
            0,
            10,
            '#spanDiemHoa',
            'Điểm phải từ 0 đến 10'
        )
    }

    // ---- Kiểm tra Giảng viên:
    if (loaiNguoiDung === 'Giảng viên') {

        // Số ngày làm việc (không trống, là số, 0 đến 24 ngày)
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.soNgayLamViec,
            1,
            undefined,
            '#spanSoNgayLamViec',
            'Không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.soNgayLamViec,
            /^[0-9]+$/,
            '#spanSoNgayLamViec',
            'Ngày làm việc phải là số'
        ) && kiemTraGiaTriChuoi(
            UserOOP.soNgayLamViec,
            0,
            24,
            '#spanSoNgayLamViec',
            'Ngày làm việc phải từ 0 đến 24'
        )

        // Lương 1 ngày (không trống, là số, 0 đến 24 ngày)
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.luongTheoNgay,
            1,
            undefined,
            '#spanluongTheoNgay',
            'Không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.luongTheoNgay,
            /^[0-9]+$/,
            '#spanluongTheoNgay',
            'Lương phải là số'
        ) && kiemTraGiaTriChuoi(
            UserOOP.luongTheoNgay,
            100000,
            500000,
            '#spanluongTheoNgay',
            'Lương phải từ 100,000 đến 500,000'
        )
    }

    // ---- Kiểm tra Khách hàng:
    if (loaiNguoiDung === 'Khách hàng') {

        // Tên công ty (không trống):
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.tenCongTy,
            1,
            undefined,
            '#spanTenCongTy',
            'Không được để trống'
        )

        // Hóa đơn (không trống, là số)
        isValid &= kiemTraChieuDaiChuoi(
            UserOOP.triGiaHoaDon,
            1,
            undefined,
            '#spanTriGiaHoaDon',
            'Không được để trống'
        ) && kiemTraDinhDangChuoi(
            UserOOP.triGiaHoaDon,
            /^[0-9]+$/,
            '#spanTriGiaHoaDon',
            'Hóa đơn phải là số'
        )

        // Đánh giá (phải chọn)
        isValid &= kiemTraSelect(
            UserOOP.danhGia,
            '#spanDanhGia',
            'Bạn chưa chọn đánh giá'
        )
    }

    return isValid ? UserOOP : undefined;
}


// Ẩn btn cập nhật, hiện btn thêm:
domID('#btnThem').onclick = () => {
    domID('#btnCapNhat').style.display = 'none';
    domID('#btnThemUser').style.display = 'inline-block';
}

// Đưa data vừa thêm lên database
domID('#btnThemUser').onclick = () => {
    const user = layThongTinNguoiDung();

    if (user) {
        const promise = axios({
            url: DOMAIN,
            method: 'POST',
            data: user
        })

        // Thông báo thêm thành công
        $('.themThanhCong').toast('show')

        promise
            .then(() => {
                getUser();

                // Đóng modal:
                domID('#btnClose').click();
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// Lấy id user muốn xóa:

let idUser = -1;

const getID = (id) => {
    idUser = id;
}

domID('#btnConfirmDelete').onclick = () => {
    deleteUser(idUser)

    // Hiển thị xóa thành công:
    $('.xoaThanhCong').toast('show')
}

// Xóa user:
const deleteUser = (id) => {
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE',
    })

    promise
        .then(() => {
            getUser();
        })
        .catch((err) => {
            console.log(err)
        })
}

// Edit user:
window.editUser = (id) => {
    // Show btn cập nhật, ẩn btn thêm:
    domID('#btnCapNhat').style.display = 'inline-block';
    domID('#btnThemUser').style.display = 'none';

    // add vào btn cập nhật thuộc tính chứa giá trị của id cần update:
    domID('#btnCapNhat').setAttribute('data-id', id);

    // Call API lấy thông tin của id cần cập nhật:
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET'
    })

    promise
        .then((result) => {
            const loaiNguoiDungEdit = result.data.loaiNguoiDung;

            if (loaiNguoiDungEdit === 'Sinh viên') {
                domID('#htmlNguoiDung').innerHTML = `
                            <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Điểm Toán</label>
                              <input type="text" class="form-control" id="diemToan" name="diemToan" placeholder="Điểm Toán" required>
                              <span class="sp-thongbao text-danger" id="spanDiemToan"></span>
                            </div>
        
                            <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Điểm Lý</label>
                              <input type="text" class="form-control" id="diemLy" name="diemLy" placeholder="Điểm Lý" required>
                              <span class="sp-thongbao text-danger" id="spanDiemLy"></span>
                            </div>
        
                            <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Điểm Hóa</label>
                              <input type="text" class="form-control" id="diemHoa" name="diemHoa" placeholder="Điểm Hóa"
                                required>
                              <span class="sp-thongbao text-danger" id="spanDiemHoa"></span>
                            </div>`

            } else if (loaiNguoiDungEdit === 'Giảng viên') {
                domID('#htmlNguoiDung').innerHTML = `
                            <div class="col-md-6 mb-3">
                              <label for="tenMon" class="font-weight-bold">Số ngày làm việc</label>
                              <input type="text" class="form-control" id="soNgayLamViec" name="soNgayLamViec" placeholder="Số ngày làm việc"
                                required>
                              <span class="sp-thongbao text-danger" id="spanSoNgayLamViec"></span>
                            </div>
        
                            <div class="col-md-6 mb-3">
                              <label for="tenMon" class="font-weight-bold">Lương theo ngày</label>
                              <input type="text" class="form-control" id="luongTheoNgay" name="luongTheoNgay" placeholder="Lương theo ngày" required>
                              <span class="sp-thongbao text-danger" id="spanluongTheoNgay"></span>
                            </div>`

            } else if (loaiNguoiDungEdit === 'Khách hàng') {
                domID('#htmlNguoiDung').innerHTML = `
                <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Tên công ty</label>
                              <input type="text" class="form-control" id="tenCongTy" name="tenCongTy" placeholder="Tên công ty" required>
                              <span class="sp-thongbao text-danger" id="spanTenCongTy"></span>
                            </div>
        
                            <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Trị giá hóa đơn</label>
                              <input type="text" class="form-control" id="triGiaHoaDon" name="triGiaHoaDon" placeholder="Trị giá hóa đơn" required>
                              <span class="sp-thongbao text-danger" id="spanTriGiaHoaDon"></span>
                            </div>
        
                            <div class="col-md-4 mb-3">
                              <label for="tenMon" class="font-weight-bold">Đánh giá</label>
                              <select class="custom-select d-block w-100" id="danhGia" name="danhGia" required>
                                <option value="">Đánh giá</option>
                                <option value="Tốt">Tốt</option>
                                <option value="Khá">Khá</option>
                                <option value="Trung bình">Trung bình</option>
                                <option value="Tệ">Tệ</option>
                              </select>
                              <span class="sp-thongbao text-danger" id="spanDanhGia"></span>
                            </div>`
            } else {
                domID('#htmlNguoiDung').innerHTML = ''
            }

            const elements = document.querySelectorAll('#loaiNguoiDung, #userForm input, #userForm select');
            elements.forEach((ele) => {
                const { name } = ele;
                ele.value = result.data[name]
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

// Hàm cập nhật:
domID('#btnCapNhat').onclick = () => {
    // lấy thông tin từ UI:
    const user = layThongTinNguoiDung();

    if (user) {
        // lấy id:
        const id = domID('#btnCapNhat').getAttribute('data-id');

        // Call API cập nhật Data base:
        const promise = axios({
            url: `${DOMAIN}/${id}`,
            method: 'PUT',
            data: user,
        })

        // Thông báo cập nhật thành công:
        $('.capNhatThanhCong').toast('show')

        promise
            .then(() => {
                getUser();

                // đóng modal sau khi thêm thành công:
                domID('#btnClose').click();

                // Xóa attribute data-id:
                domID('#btnCapNhat').toggleAttribute('data-id', false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// Reset ô input khi đóng modal:
domID('#btnClose').onclick = () => {
    domID('#userForm').reset()

    domID('#htmlNguoiDung').innerHTML = `
                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Toán</label>
                      <input type="text" class="form-control" id="diemToan" name="diemToan" placeholder="Điểm Toán" required>
                      <span class="sp-thongbao text-danger" id="spanDiemToan"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Lý</label>
                      <input type="text" class="form-control" id="diemLy" name="diemLy" placeholder="Điểm Lý" required>
                      <span class="sp-thongbao text-danger" id="spanDiemLy"></span>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label for="tenMon" class="font-weight-bold">Điểm Hóa</label>
                      <input type="text" class="form-control" id="diemHoa" name="diemHoa" placeholder="Điểm Hóa"
                        required>
                      <span class="sp-thongbao text-danger" id="spanDiemHoa"></span>
                    </div>`


    domID('#spanHoTen').innerHTML = ''
    domID('#spanDiaChi').innerHTML = ''
    domID('#spanMa').innerHTML = ''
    domID('#spanEmail').innerHTML = ''
    domID('#spanDiemToan').innerHTML = ''
    domID('#spanDiemLy').innerHTML = ''
    domID('#spanDiemHoa').innerHTML = ''
    domID('#spanSoNgayLamViec').innerHTML = ''
    domID('#spanluongTheoNgay').innerHTML = ''
    domID('#spanTenCongTy').innerHTML = ''
    domID('#spanTriGiaHoaDon').innerHTML = ''
    domID('#spanDanhGia').innerHTML = ''
}

// Lọc theo loại người dùng:
domID('#filterLoai').onchange = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })

    promise
        .then((result) => {
            const user = result.data;
            let arrFilter = [];

            if (domID('#filterLoai').value === 'sinhVien') {
                arrFilter = user.filter(value => value.loaiNguoiDung === 'Sinh viên')
            } else if (domID('#filterLoai').value === 'giangVien') {
                arrFilter = user.filter(value => value.loaiNguoiDung === 'Giảng viên')
            } else if (domID('#filterLoai').value === 'khachHang') {
                arrFilter = user.filter(value => value.loaiNguoiDung === 'Khách hàng')
            } else {
                arrFilter = user;
            }
            renderUser(arrFilter);

            $('.filterThanhCong').toast('show')

        })
        .catch((err) => {
            console.log(err)
        })
}

// Sắp xếp theo thứ tự họ tên:
domID('#filterHoTen').onchange = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })

    promise
        .then((result) => {
            const user = result.data;
            let arrSapXep = [];

            if (domID('#filterHoTen').value === 'AZ') {
                arrSapXep = user.sort((a, b) => {
                    if (a.hoTen.toLowerCase() > b.hoTen.toLowerCase()) {
                        return 1;
                    }
                    if (a.hoTen.toLowerCase() < b.hoTen.toLowerCase()) {
                        return -1;
                    }
                })
            } else if (domID('#filterHoTen').value === 'ZA') {
                arrSapXep = user.sort((a, b) => {
                    if (a.hoTen.toLowerCase() > b.hoTen.toLowerCase()) {
                        return -1;
                    }
                    if (a.hoTen.toLowerCase() < b.hoTen.toLowerCase()) {
                        return 1;
                    }
                })
            } else {
                arrSapXep = user;
            }
            renderUser(arrSapXep)

            $('.sapXepThanhCong').toast('show')

        })
        .catch((err) => {
            console.log(err)
        })
}