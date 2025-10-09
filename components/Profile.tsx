const user = {
  name: 'Hedy Lamarr',
  description: 'Hedy Lamarr was an Austrian and American actress and inventor. After a brief early film career in Czechoslovakia, including the controversial erotic romantic drama Ecstasy, she fled from her first husband, Friedrich Mandl, and secretly moved to Paris.',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
  borderRadius: '50%'
};

function Profile() {
  return (
    <div className="border border-primary border-2 rounded p-4 d-inline-block mt-4">
      <h1>{user.name}</h1>
      <img
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
          borderRadius: user.borderRadius
        }}
      />
      <p className="text-start mx-auto" style={{ maxWidth: 400 }}>
        {user.description}
      </p>
    </div>
  );
}

export default Profile;