export const VALIDATE = {
    LOGIN:{
        INPUTUSERNAME: 'description.columncontent.login.inputusername',
        CONUSERNAME: 'description.columncontent.register.conusername',
        INPUTPASSWORD: 'description.columncontent.login.inputpassword',
        CONPASS1: 'description.columncontent.register.conpass1',
        CONPASS2: 'description.columncontent.register.conpass2'
    },
    REGISTER: {
        USERNAME:{
          INPUTUSERNAME: 'description.columncontent.register.inputusername',
          CONUSERNAME: 'description.columncontent.register.conusername',
          CONUSERNAME1: 'description.columncontent.register.conusername1',
          CONUSERNAME2: 'description.columncontent.register.conusername2'
        },
        PASSWORD: {
           INPUTPASSWORD: 'description.columncontent.register.inputpassword',
           CONPASS1: 'description.columncontent.register.conpass1',
           CONPASS2:  'description.columncontent.register.conpass2',        
        },
        FULLNAME: 'description.columncontent.register.inputfullname',
        GENDER: 'description.columncontent.register.inputgender',
        DATEOFBIRTH: {
            INPUT: 'description.columncontent.register.inputdateOfBirth',
            CONDITION: 'description.columncontent.register.condateOfBirth'
        },
        PHONE: {
            INPUT: 'description.columncontent.register.inputphone',
            CONDITION: 'description.columncontent.register.conphone'
        },
        EMAIL: {
            INPUT: 'description.columncontent.register.inputemail',
            CONDITION1: 'description.columncontent.register.conemail1',
            CONDITION2: 'description.columncontent.register.conemail2'
        },
        ADDRESS: 'description.columncontent.register.inputaddress',
    },
  CHANGEPASSWORD: {
    OLDPASS: {
      REQUIRED: 'description.columncontent.changepass.inputoldpass',
      MIN: 'description.columncontent.register.conpass1',
      MATCHES: 'description.columncontent.register.conpass2',
    },
    PASSWORD: {
      REQUIRED: 'description.columncontent.changepass.inputnewpass',
      MIN: 'description.columncontent.register.conpass1',
      MATCHES: 'description.columncontent.register.conpass2',
    },
    REPASSWORD: {
      REQUIRED: 'description.columncontent.reset.inputconfirmpass',
      MIN: 'description.columncontent.register.conpass1',
      MATCHES: 'description.columncontent.register.conpass2',
    },
  },
  FORGOTPASSWORD: {
    EMAIL: 'description.columncontent.forgotpass.email',
    CONEMAIL: 'description.columncontent.register.conemail1',
  },
  RESET: {
    PASSWORD: {
      REQUIRED: 'description.columncontent.reset.inputnewpass',
      MIN: 'description.columncontent.register.conpass1',
      MATCHES: 'description.columncontent.register.conpass2',
    },
    REPASSWORD: {
      REQUIRED: 'description.columncontent.reset.inputconfirmpass',
      MIN: 'description.columncontent.register.conpass1',
      MATCHES: 'description.columncontent.register.conpass2',
    },
  },
};
