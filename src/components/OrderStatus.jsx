import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const OrderStatus = ({ order }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 10;
        if (newProgress === 50) setStatus('cooking');
        if (newProgress === 100) setStatus('ready');
        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card className="fixed bottom-4 left-4 z-10 w-80">
      <CardHeader>
        <CardTitle>Order #{order.id}</CardTitle>
        <CardDescription>Status: {status}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
      </CardContent>
    </Card>
  );
};

export default OrderStatus;
