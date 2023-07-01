export default function UserProfile({ params }: any) {
  return (
    <div className="bg-gray-900 h-screen text-center text-white mx-auto">
      User Profile
      <p>User Profile {params.id}</p>
    </div>
  );
}

// ! Whenever we want to grab  the parameter passed in the url we use this way.. let say we have to grab the id here 'sahani' is the id in /profile so inside profile folder we have to make a folder "[id] ". It will be responsible to extract profile id. now make a page.tsx inside [id] folder and pass {params} in the function method... now where ever u want to use id  just use {params.id} thats it

// http://localhost:3000/profile/sahani  //* here sahani is treated as id