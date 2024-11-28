"use client"

import { useParams } from "next/navigation";

interface CarProps {
    carId: number;
  }
  
  export default function CarPage(props: CarProps) {
    const params = useParams();
    const id = params?.id;
    return (
      <div>
        Car page with ID: {id}
      </div>
    );
  }
  