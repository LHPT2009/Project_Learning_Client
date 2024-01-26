const translationsEN = {
  description: {
    titleadmin: 'Admin',
    titleuserpage: 'Manager User',
    sidebarcontent: {
      usermanagement: 'User Management',
      doctormanagement: 'Doctor Management',
      hospitalmanagement: 'Hospital Management',
      bookingmanagement: 'Booking Management',
      packagemanagement: 'Manage Medical Packages',
      paymentmanagement: 'Payment Management',
    },
    columncontent: {
      usermanagement: {
        id: 'User ID',
        fullname: 'Full Name',
        phone: 'Phone Number',
        email: 'Email',
        date_of_birth: 'Date of Birth',
        gender: 'Gender',
        createdAt: 'Joining Date',
        status: 'Status',
      },
      doctormanagement: {
        id: 'Doctor ID',
        fullNameDoctor: 'Doctor Name',
        phoneNumber: 'Phone Number',
        gender: 'Gender',
        date_of_birth: 'Date of Birth',
        hospitalsName: 'Hospital',
        address: 'Address',
        specialityId: 'Specialty',
        status: 'Status',
        action: 'Action',
      },
      hospitalmanagement: {
        id: 'Hospital ID',
        name: 'Hospital Name',
        desciption: 'Description',
        address: 'Address',
        status: 'Status',
        createdAt: 'Creation Date',
        action: 'Action',
      },
      bookingmanagement: {
        code: 'Booking Code',
        fullNameUser: 'Customer Name',
        nameHospital: 'Hospital Name',
        namePackageClinic: 'Medical Package',
        fullNameDoctor: 'Attending Doctor',
        booking_date: 'Booking Date',
        booking_time: 'Booking Time',
        status: 'Status',
        description: 'Payment Status',
        action: 'Action',
      },
      packagemanagement: {
        id: 'Medical Package ID',
        name: 'Package Name',
        description: 'Description',
        price: 'Price',
        gender: 'Gender',
        age: 'Age Range',
        createdAt: 'Creation Date',
        updatedAt: 'Update Date',
        status: 'Status',
        action: 'Action',
      },
      paymentmanagement: {},
    },
    filtercontent: {
      usermanagement: {},
      doctormanagement: {},
      hospitalmanagement: {},
      bookingmanagement: {},
      packagemanagement: {},
      paymentmanagement: {},
    },
  },
};

export default translationsEN;
