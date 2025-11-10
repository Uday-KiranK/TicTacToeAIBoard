import RoomLobby from "../RoomLobby";

export default function RoomLobbyExample() {
  return (
    <RoomLobby
      onCreateRoom={() => console.log("Create room clicked")}
      onJoinRoom={(roomId) => console.log("Join room:", roomId)}
    />
  );
}
