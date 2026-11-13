import { cacheLife } from "next/cache";

export async function getWorkshopItem(id: string) {
    'use cache'
    cacheLife('hours')

    const response = await fetch(
      'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          itemcount: '1',
          'publishedfileids[0]': id,
        }),
      }
    );

    return response.json();
}