import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const response = axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.footItems);
      });
  }, [id]);

  return (
    <main>
      <section>
        <div>
          <img src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" />

          <div>
            <h1 title="Buissnuss name">{profile?.name}</h1>
            <p title="Address">{profile?.address}</p>
          </div>
        </div>

        <div role="list">
          <div>
            <span>Total Meals</span>
            <span>{profile?.totalMeals}</span>
          </div>

          <div>
            <span>Customer Served</span>
            <span>{profile?.customersServed}</span>
          </div>
        </div>
      </section>

      <hr />

      <section>
        {videos.map((v) => (
          <div key={v.id}>
            <video src={v.video}></video>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
