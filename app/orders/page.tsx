"use client";

import Image from "next/image";
import { OrdersPopulate } from "@/models/Order";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [orders, setOrders] = useState<OrdersPopulate[]>([]);
  const pendingOrders: OrdersPopulate[] = [];
  const acceptedOrders: OrdersPopulate[] = [];
  const rejectedOrders: OrdersPopulate[] = [];

  orders.forEach((order: OrdersPopulate) => {
    if (order.status === "pending") {
     pendingOrders.push(order);
    } else if (order.status === "accepted") {
      acceptedOrders.push(order);
    } else {
      rejectedOrders.push(order);
    }
  });

  function DatetoString(inputDate: Date) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const orderList = (orders: OrdersPopulate[]) => {
    return (
      <div>
        <div className="">
          {orders.length ? (
            <div className="flex px-8 pt-8 pb-4">
              <div className="mx-5 w-20 flex-none"></div>
              <div className="mx-5">
                <p className="flex-none w-96 font-medium">Gig name</p>
              </div>
              <div className="mx-5">
                <p className="flex-none w-32 font-medium">Request Date</p>
              </div>
              <div className="mx-5">
                <p className="flex-none w-32 font-medium">Deadline</p>
              </div>
              <div className="mx-5">
                <p className="flex-none w-32 font-medium">Status</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {orders.length ? (
            orders.map((order: OrdersPopulate, index: number) => (
              <div key={index}>
                <div className="flex px-8 py-8">
                  <div className="my-auto">
                    <Image
                      width={80}
                      height={80}
                      className="h-12 w-20 rounded-md mx-5 flex-none "
                      src={`data:image/jpeg;base64,${order.gig_ordered.thumbnail}`}
                      alt="This is a gig image"
                    />
                  </div>
                  <blockquote className="mx-5">
                    <p className="text-lg my-2 text-black font-medium flex-none w-96">
                      {order.gig_ordered.name}
                    </p>
                  </blockquote>

                  <div className="mx-5">
                    <p className="text-lg my-2 text-gray-500 font-medium flex-none w-32">
                      {DatetoString(order.accepted_date)}
                    </p>
                  </div>

                  <div className="mx-5">
                    <p className="text-lg my-2 text-gray-500 font-medium flex-none w-32">
                      {DatetoString(order.deadline)}
                    </p>
                  </div>

                  <div className="mx-5">
                    <p className="text-lg my-2 text-gray-500 font-medium flex-none w-32">
                      {order.status}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))
          ) : (
            <p className="px-8 py-8">You do not have any Gigs to show!</p>
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get("/api/cookies");
        const response = await axios.get(
          `/api/orders?buyer=${user.data}`
        );
        setOrders(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl ml-10 my-5">
        Your Pending Orders
      </h2>
      {pendingOrders ? orderList(pendingOrders) : ""}

      <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl ml-10 my-5">
        Accepted by seller
      </h2>
      {acceptedOrders ? orderList(acceptedOrders) : ""}

      <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl ml-10 my-5">
        Rejected by seller
      </h2>
      {rejectedOrders ? orderList(rejectedOrders) : ""}
    </div>
  );
}
