import React from 'react';
import '../styles/Layout.css';

function Footer() {
  return (
    <footer className=" text-light pt-5 pb-3 mt-5 border-top fixed-bottom">
      <div className="container">
        <div className="row">
          {/* Thông tin cá nhân */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Lê Thanh Trà</h5>
            <p>FrontEnd Developer</p>
            <p>
              Email:{' '}
              <a
                href="mailto:lethanhtra06092004@gmail.com"
                className="text-decoration-none text-light"
              >
                lethanhtra06092004@gmail.com
              </a>
            </p>
            <p>
              SĐT / Zalo:{' '}
              <a
                href="tel:0913643029"
                className="text-decoration-none text-light"
              >
                0913643029
              </a>
            </p>
          </div>

          {/* Liên kết mạng xã hội */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Kết nối</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com/LeThanhTra0609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-light"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Thanh-Tr%C3%A0/pfbid0eQEuMcU1M17KifkBVndjiq4iLWgerMiQKK6gTDJXdyxNkvfce487o9cQHXzeL9bMl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-light"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Liên kết trang chính */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" className="text-decoration-none text-light">
                  Về tôi
                </a>
              </li>
              <li>
                <a href="#projects" className="text-decoration-none text-light">
                  Dự án
                </a>
              </li>
              <li>
                <a href="#skills" className="text-decoration-none text-light">
                  Kỹ năng
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none text-light">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div
          className="text-center border-top pt-3 mt-4"
          style={{ borderColor: 'var(--gray-light)' }}
        >
          <small>© 2025 Lê Thanh Trà. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
