  //  async updateHouse(
  //       id: string,
  //       location: string,
  //       price: number,
  //       bedroom: number,
  //       bathroom: number,
  //       area: string
  //     ) {
  //       const res: any = await firstValueFrom(
  //         http.patch(`${environment.apiBaseUrl}/houses/${id}`, {
  //           location,
  //           price,
  //           bedroom,
  //           bathroom,
  //           area,
  //         })
  //       );

  //       const draft = res.draft;

  //       patchState(store, {
  //         pendingHouses: [
  //           ...store.pendingHouses().filter((h) => h.id !== id), // FIXED
  //           draft,
  //         ],
  //       });
  //     },



// async updateHouse(
//   id: string,
//   location: string,
//   price: number,
//   bedroom: number,
//   bathroom: number,
//   area: string
// ) {
//   const res: any = await firstValueFrom(
//     http.patch(`${environment.apiBaseUrl}/houses/${id}`, {
//       location,
//       price,
//       bedroom,
//       bathroom,
//       area,
//     })
//   );

//   const updated = res.updatedHouse;

//   patchState(store, {
//     houses: store.houses().map((h) => (h.id === id ? updated : h)),
//     notifications: store
//       .notifications()
//       .map((n) => (n.house.id === id ? { ...n, house: updated } : n)),
//   });

//   if (updated.priceReduced) {
//     patchState(store, { notificationCounter: store.notificationCounter() + 1 });
//   }
// },
