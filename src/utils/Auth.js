// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthenticatedAdmin } from 'hooks/useAuthenticatedAdmin';
// import Cookies from 'js-cookie';

const Auth = ({ children }) => {
  //   // Sử dụng hook để kiểm tra quyền
  //   const { authenticated } = useAuthenticatedAdmin();
  //   // Sử dụng hook để điều hướng trang
  //   const navigate = useNavigate();
  //   // Sử dụng useEffect để thực hiện các hành động sau mỗi lần render
  //   useEffect(() => {
  //     // Hàm fetchData kiểm tra authenticated
  //     const fetchData = async () => {
  //       // Nếu không ủy quyền, chuyển hướng đến trang đăng nhập
  //       if (!authenticated) {
  //         navigate('/login');
  //         Cookies.remove('accessToken');
  //         Cookies.remove('refreshToken');
  //       }
  //     };
  //     // Gọi hàm fetchData
  //     fetchData();
  //   }, [authenticated]);
  //   // Render các thành phần con nếu authenticated, ngược lại render null
  //   return authenticated ? <>{children}</> : null;
};

export default Auth;
