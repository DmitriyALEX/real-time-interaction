// const BaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_BASE_URL

// export const urls = {
//     //CHECK USER
//     checkUser: `${BaseUrl}/api/check-user`,
//     //CREATE OR UPDATE USERNAME
//     setUsername: `${BaseUrl}/api/set-username`,

//     //DELETE PROFILE
//     deleteUserProfile: `${BaseUrl}/api/delete-profile`,

//     //PUBLIC PROFILE
//     publicProfile: `${BaseUrl}/api/public-profile`,
// }

export const urls = {
    //CHECK USER
    checkUser: '/api/check-user',
    //CREATE OR UPDATE USERNAME
    setUsername: '/api/set-username',

    //DELETE PROFILE
    deleteUserProfile: '/api/delete-profile',

    //PUBLIC PROFILE
    publicProfile: '/api/public-profile',
}
