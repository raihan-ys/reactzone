const user = {
  name: 'Raihan Yudi Syukma',
  description: 'Raihan Yudi Syukma adalah seorang pengembang web Fullstack Developer asal Pekanbaru yang memiliki keahlian dalam membangun aplikasi web menggunakan berbagai kerangka kerja modern',
  imageUrl: 'https://media.licdn.com/dms/image/v2/D4E35AQF2Pnw-NOyGQw/profile-framedphoto-shrink_400_400/B4EZofCMVhJ0Ac-/0/1761457260122?e=1768370400&v=beta&t=1rDCh7VVZsdsz5UbSD8q5vP6Tw8a_Qkw8U9LWHWMhyI',
  imageSize: 90,
  borderRadius: '50%'
};

function Profile() {
  const greet = user.name == 'Raihan Yudi Syukma' && user.imageSize == 90 ? 'Hello, Raihan!' : 'Hello, Guest!';
  return (
    <div className="border border-5 rounded d-inline-block p-3">
      <h1 className="text-light">{greet}</h1>
      <img
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
          borderRadius: user.borderRadius
        }}
      />
      <p className="text-start mx-auto" style={{ maxWidth: 400, color: 'white' }}>
        {user.description}
      </p>
    </div>
  );
}

export default Profile;