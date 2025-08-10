import Dexie from "dexie";

class VideoDB extends Dexie {
  videos: Dexie.Table<{ id: string; blob: Blob }, string>;

  constructor() {
    super("VideoDatabase");
    this.version(1).stores({
      videos: "id"
    });
    this.videos = this.table("videos");
  }
}

export const db = new VideoDB();

export async function saveVideo(id: string, blob: Blob) {
  await db.videos.put({ id, blob });
}

export async function getVideo(id: string) {
  return await db.videos.get(id);
}

export async function deleteVideo(id: string) {
  await db.videos.delete(id);
}
