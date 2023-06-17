export interface Post {
    title: string,
    permalink: string,
    categoryId: string,
    postImgPath: string,
    excerpt: string,
    content: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Date
}
