// // src/app/bookmarks/bookmark.store.ts
// import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
// import { inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';
// import { MarkdownService } from '../articles/mark-down.service';
// import { SafeHtml } from '@angular/platform-browser';

// export interface Bookmark {
//   id: number;
//   title: string;
//   email: string | null;
//   safeTitle?: SafeHtml;
// }

// export interface BookmarkState {
//   bookmarks: Bookmark[];
// }

// export const BookmarkStore = signalStore(
//   { providedIn: 'root' },
//   withState<BookmarkState>({ bookmarks: [] }),

//   withMethods((store) => {
//     const http = inject(HttpClient);
//     const markdown = inject(MarkdownService);

//     return {
//       /** Load all bookmarks */
//       async loadAll() {
//         const res: any = await firstValueFrom(http.get(`http://localhost:4442/bookmarks`));

//         const processed = res.map((b: any) => ({
//           ...b,
//           safeTitle: markdown.toSafeHtml(b.title),
//         }));

//         patchState(store, { bookmarks: processed });
//       },

//       /** Remove a bookmark */
//       async remove(id: number) {
//         try {
//           await firstValueFrom(http.delete(`http://localhost:4442/bookmarks/${id}`));
//           const filtered = store.bookmarks().filter((b) => b.id !== id);
//           patchState(store, { bookmarks: filtered });
//         } catch (err) {
//           console.error('Error deleting bookmark:', err);
//         }
//       },
//     };
//   })
// );
