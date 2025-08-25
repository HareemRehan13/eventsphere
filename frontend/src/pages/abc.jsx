import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [expos, setExpos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchExpos();
  }, []);

  const fetchExpos = async () => {
    const data = await api("/expo", { method: "GET" });
    setExpos(data);
  };

  const createExpo = async (e) => {
    e.preventDefault();
    await api("/expo/create", {
      method: "POST",
      body: { title, description: desc, location, date },
    });
    setTitle(""); setDesc(""); setLocation(""); setDate("");
    fetchExpos();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Organizer Dashboard</h1>

      {/* Create Expo Form */}
      <form onSubmit={createExpo} className="space-y-3 border p-4 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold">Create Expo</h2>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button type="submit">Create</Button>
      </form>

      {/* Expo List */}
      <div className="grid gap-4 md:grid-cols-2">
        {expos.map((expo) => (
          <Card key={expo._id} className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>{expo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{expo.description}</p>
              <p className="text-sm text-gray-500">{new Date(expo.date).toDateString()}</p>
              <p className="font-medium">📍 {expo.location}</p>
              <Button variant="outline" size="sm" className="mt-2">Manage Booths</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
