import Counter from '../_components/Counter';

export default async function page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  // console.log(data);

  return (
    <div>
      <h1>Cabins Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
      <Counter users={data} />
    </div>
  );
}
