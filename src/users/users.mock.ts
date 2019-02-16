// Tokens skapade för mock på => https://jwt.io/ => ALGORITHM HS256 => secret: 123456789Z
// HMACSHA256(
//     base64UrlEncode(header) + "." +
//     base64UrlEncode(payload),
//     123456789Z
// )
export const UsersMock: any[] = [
    {
    id: 1,
    username: 'admin',
    // App i produktion bör använda OAuth 2.0 för skapa token eller implementera JWT
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIn0.Pt_bG1sexU2z0yQYFbAd-n47_EQpEfUkeIvpjtLUgLw'
    ,
    },
    {
    id: 2,
    username: 'test',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6InRlc3QifQ.NXG53aMWWSHnzybh1Wk-0rDRi-yF-tBl9TDhmfAaqT0',
    },
];
