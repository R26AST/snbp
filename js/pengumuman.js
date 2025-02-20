function sendData() {
    document.getElementById('index-form-alert').style.display = 'hide';
    var nomor = document.getElementById("index-form-registration-number").value.trim();
    var day = document.getElementById("index-form-birthday-day").value.trim();
    var month = document.getElementById("index-form-birthday-month").value.trim();
    var year = document.getElementById("index-form-birthday-year").value.trim();
    var err = '';
    if (nomor == '') {
        err = 'Nomor peserta tidak boleh kosong';
    } else if (day == '') {
        err = 'Tanggal lahir tidak boleh kosong';
    } else if (month == '') {
        err = 'Bulan lahir tidak boleh kosong';
    } else if (year == '') {
        err = 'Tahun lahir tidak boleh kosong';
    }

    if (err != '') {
        document.getElementById('index-form-alert').innerHTML = err;
        document.getElementById('index-form-alert').style.display = 'block';
        return false;
    } else {
        var tgl_lahir = year + "-" + ('00' + month).slice(-2) + "-" + ('00' + day).slice(-2);
        const dt = '{"no_peserta":"' + nomor + '","tgl_lahir":"' + tgl_lahir + '"}';
        console.log(tgl_lahir);
        var i = nomor.toString() + year.toString() + month.toString() + day.toString(),
		    o = i;
            console.log(o);
        /*fetch('/pengumuman/hasil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: dt,
            })
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.diterima == '1') {
                    accepted(result);
                } else if (result.diterima == '0') {
                    rejected(result);
                } else if (result.data == 'not yet') {
					const tgl = result.tgl.toString()
					let ret=[];
					let date=[];
					const str = tgl.substr(8,6);
					for(i = 0, 6; i < 6; i += 2) {
					   ret.push(str.substr(i, 2))
					}
					date.push(tgl.substr(6,2))
					date.push(tgl.substr(4,2))
					date.push(tgl.substr(0,4))
					const jam = ' '+ret.join(':')
                    document.getElementById('alert').innerHTML = 'Hasil seleksi akan diumumkan pada '+date.join('-')+jam;
                    document.getElementById('alert').style.display = 'block';
                } else {
                    document.getElementById('alert').innerHTML = 'Nomor peserta atau tanggal lahir tidak ditemukan';
                    document.getElementById('alert').style.display = 'block';
                }
            })
            .catch(error => {
                document.getElementById('alert').innerHTML = 'Ada kesalahan di koneksi';
                document.getElementById('alert').style.display = 'block';
            });*/

            $.ajax({
                type: 'GET',
                url: 'https://r26ast.github.io/snbp/json/hasil.json',
                dataType: 'json',
                beforeSend: function(){
                },
                    success: function(result) {
                        console.log(result);
                        if(result) {
                        var size = result.length;
                            if(size > 0){
                                //console.log("success");
                                let id = _.find(result, ["id", ""+ o +""]);
                                console.log(id);
                                    //if (o == id["id"] && id["diterima"] == '1') {
                                if(typeof id != "undefined") {
                                    if (id["diterima"] == '1') {
                                        console.log("diterima");
                                        accepted(id);
                                    } //else if (o == id["id"] && id["diterima"] == '0') {
                                    else if (id["diterima"] == '0') {
                                        rejected(id);
                                        console.log("tidak diterima");
                                    }
                                }
                                else {
                                        document.getElementById('index-form-alert').innerHTML = 'Nomor peserta atau tanggal lahir tidak ditemukan';
                                        document.getElementById('index-form-alert').style.display = 'block';
                                    }
                                }
                        }
                    },
                    error: function() {
                        console.log("error");
                        document.getElementById('index-form-alert').innerHTML = 'Ada kesalahan di koneksi';
                        document.getElementById('index-form-alert').style.display = 'block';
                    }
                });	
    }
}

function rejected(data) {
    var tmpl =
        '<div id="index-rejected" class="index-rejected">' +
        '<div class="index-rejected-header">' +
        '<img src="img/snbp.png" alt="Logo" class="index-rejected-header-icon">' +
        '<div class="header-title">' +
        '<h1 class="index-rejected-header-title-text">ANDA DINYATAKAN TIDAK LULUS SELEKSI SNBP ' + new Date().getFullYear() + '</h1>' +
        '<span class="index-rejected-header-title-sub">MASIH ADA KESEMPATAN MENDAFTAR DAN MENGIKUTI SNBT 2025 ATAU SELEKSI MANDIRI PTN.</span>' +
        ' </div>' +
        '</div>' +
        '<div class="index-rejected-content">' +
        '<div class="index-rejected-content-upper">' +
        '<div class="index-rejected-content-upper-bio">' +
        '<span class="index-rejected-content-upper-bio-nisn" id="index-rejected-nisn">' + data["no_peserta"] + '</span>' +
        '<span class="index-rejected-content-upper-bio-name" id="index-rejected-name">' + data["nama"] + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="index-rejected-content-lower">' +
        '<div class="index-rejected-content-lower-column index-rejected-content-lower-column-25">' +
        '<div class="index-rejected-content-lower-column-field">' +
        '<span class="index-rejected-content-lower-column-field-caption">Tanggal Lahir</span>' +
        '<span class="index-rejected-content-lower-column-field-value" id="index-rejected-birthday">' + data["tgl_lahir"] + '</span>' +
        '</div>' +
         '<div class="index-rejected-content-lower-column-field">'+
            '<span class="index-rejected-content-lower-column-field-caption">Asal Sekolah</span>'+
            '<span class="index-rejected-content-lower-column-field-value" id="index-rejected-school">' + data["sekolah"] + '</span>'+
        '</div>'+ 
        '</div>' +
         '<div class="index-rejected-content-lower-column index-rejected-content-lower-column-25">'+
            '<div class="index-rejected-content-lower-column-field">'+
                '<span class="index-rejected-content-lower-column-field-caption">Kabupaten/Kota</span>'+
                '<span class="index-rejected-content-lower-column-field-value" id="index-rejected-regency">' + data["kab"] + '</span>'+
            '</div>'+
            '<div class="index-rejected-content-lower-column-field">'+
                '<span class="index-rejected-content-lower-column-field-caption">Provinsi</span>'+
                '<span class="index-rejected-content-lower-column-field-value" id="index-rejected-province">' + data["prov"] + '</span>'+
            '</div>'+
        '</div>'+ 
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('index').innerHTML = tmpl;
}

function accepted(data) {
    var tmpl =
        '<div id="index-accepted" class="index-accepted">' +
        '<div class="index-accepted-header">' +
        '<img src="img/snbp.png" alt="Logo" class="index-accepted-header-icon">' +
        '<div class="index-accepted-header-title">' +
        '<h1 class="index-accepted-header-title-text">SELAMAT! ANDA DINYATAKAN LULUS SELEKSI SNBP ' + new Date().getFullYear() + '</h1>' +
        '</div>' +
        '</div>' +
        '<div class="index-accepted-content">' +
        '<div class="index-accepted-content-upper">' +
        '<div class="index-accepted-content-upper-bio">' +
        `<span class="index-accepted-content-upper-bio-nisn" id="index-accepted-nisn">` + ` NISN ` + data["nisn"] + ` - ` + ` NOREG ` + data["no_peserta"] + `</span>` +
        '<span class="index-accepted-content-upper-bio-name" id="index-accepted-name">' + data["nama"] + '</span>' +
        '<span class="index-accepted-content-upper-bio-program" id="index-accepted-program">' + data["prodi"] + '</span>' +
        '<span class="index-accepted-content-upper-bio-university" id="index-accepted-university">' + data["univ"] + '</span>'+
        '</div>' +
        '<img class="index-accepted-content-upper-qr" alt="QR" id="index-accepted-qr" src="img/qr.png">' +
        '</div>' +
        '<div class="index-accepted-content-lower">' +
        '<div class="index-accepted-content-lower-column index-accepted-content-lower-column-25">' +
        '<div class="index-accepted-content-lower-column-field">' +
        '<span class="index-accepted-content-lower-column-field-caption">Tanggal Lahir</span>' +
        '<span class="index-accepted-content-lower-column-field-value" id="index-accepted-birthday">' + data["tgl_lahir"] + '</span>' +
        '</div>' +
        '<div class="index-accepted-content-lower-column-field">'+
            '<span class="index-accepted-content-lower-column-field-caption">Asal Sekolah</span>'+
            '<span class="index-accepted-content-lower-column-field-value" id="index-accepted-school">' + data["sekolah"] + '</span>'+
        '</div>'+ 
        '</div>' +
        '<div class="index-accepted-content-lower-column index-accepted-content-lower-column-25">'+
            '<div class="index-accepted-content-lower-column-field">'+
                '<span class="index-accepted-content-lower-column-field-caption">Kabupaten/Kota</span>'+
                '<span class="index-accepted-content-lower-column-field-value" id="index-accepted-regency">' + data["kab"] + '</span>'+
            '</div>'+
            '<div class="index-accepted-content-lower-column-field">'+
                '<span class="index-accepted-content-lower-column-field-caption">Provinsi</span>'+
                '<span class="index-accepted-content-lower-column-field-value" id="index-accepted-province">' + data["prov"] + '</span>'+
            '</div>'+
        '</div>'+ 
        '<div class="index-accepted-content-lower-column index-accepted-content-lower-column-50">' +
        '<div class="index-accepted-content-lower-column-note">' +
        '<span class="index-accepted-content-lower-column-note-title">Silakan lakukan pendaftaran ulang.</span>'+
        // '<span class="index-accepted-content-lower-column-note-title">Registrasi.</span>' +
        '<span class="index-accepted-content-lower-column-note-subtitle">Informasi pendaftaran ulang di PTN/Politeknik Negeri dapat dilihat pada link berikut:</span>' +
        '<a href="' + data["link"] + '" target="_blank" class="index-accepted-content-lower-column-note-link" id="index-accepted-link">' + data["link"] + '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="index-accepted-footer">' +
        '<p class="index-accepted-footer-paragraph">Status penerimaan Anda sebagai mahasiswa akan ditetapkan setelah PTN tujuan melakukan verifikasi data akademik (rapor dan/atau portofolio). Silakan Anda membaca peraturan tentang penerimaan mahasiswa baru di laman PTN tujuan. </p>' +
        '<p class="index-accepted-footer-paragraph">Khusus peserta KIP Kuliah, PTN tujuan juga dapat melakukan verifikasi data ekonomi dan/atau kunjungan ke tempat tinggal Anda sebelum menetapkan status penerimaan Anda.</p>' +
        '</div>' +
        '</div>';
    document.getElementById('index').innerHTML = tmpl;
}
