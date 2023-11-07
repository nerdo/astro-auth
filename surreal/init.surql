DEFINE FUNCTION fn::session::get($record: option<record>) {
    RETURN IF $record IS NONE {
        RETURN CREATE ONLY session
    } ELSE IF meta::tb($record) IS 'session' {
        LET $r = (SELECT * FROM $record)[0];
        RETURN IF $r IS NONE {
            RETURN CREATE ONLY session
        } ELSE {
            RETURN $r
        }
    } ELSE {
        THROW "Invalid Session ID."
    }
};

DEFINE FUNCTION fn::session::set($record: record, $data: object) {
    RETURN IF meta::tb($record) IS 'session' {
        RETURN UPDATE ONLY $record CONTENT $data
    } ELSE {
        THROW "Invalid Session ID."
    }
};

DEFINE FUNCTION fn::session::merge($record: record, $data: object) {
    RETURN IF meta::tb($record) IS 'session' {
        RETURN UPDATE ONLY $record MERGE $data
    } ELSE {
        THROW "Invalid Session ID."
    }
};

CREATE config:grant CONTENT {
  google: {
    key: 'GOOGLE-KEY',
    secret: 'GOOGLE-SECRET',
    scope: ['openid', 'email'],
    nonce: true,
  }
}
