import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  lightboxImage: string | null = null;
  activeGalleries: string[] = [];
  currentImageIndex: number = 0;
  currentProject: string = '';

  projectImages: { [key: string]: GalleryImage[] } = {
 
   chat: [
    { src: 'chat1.png', alt: 'Description de l’image' },
    { src: 'chat2.png', alt: 'Description de l’image' },
    { src: 'chat3.png', alt: 'Description de l’image' },
    { src: 'chat4.png', alt: 'Description de l’image' },
    { src: 'chat5.png', alt: 'Description de l’image' },
    { src: 'chat6.png', alt: 'Description de l’image' }
  ]
  };

  toggleGallery(galleryId: string): void {
    if (this.activeGalleries.includes(galleryId)) {
      this.activeGalleries = this.activeGalleries.filter(id => id !== galleryId);
    } else {
      this.activeGalleries = [...this.activeGalleries, galleryId];
      this.currentProject = galleryId;
      this.scrollToGallery(galleryId);
    }
  }

  private scrollToGallery(galleryId: string): void {
    setTimeout(() => {
      const element = document.querySelector(`.gallery-container[data-gallery="${galleryId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }

  openLightbox(img: GalleryImage, project: string): void {
    this.currentProject = project;
    const gallery = this.projectImages[project];
    this.currentImageIndex = gallery.findIndex(i => i.src === img.src);
    this.lightboxImage = `assets/images/${project}/${img.src}`;
  }

  nextImage(): void {
    const gallery = this.projectImages[this.currentProject];
    this.currentImageIndex = (this.currentImageIndex + 1) % gallery.length;
    this.lightboxImage = `assets/images/${this.currentProject}/${gallery[this.currentImageIndex].src}`;
  }

  prevImage(): void {
    const gallery = this.projectImages[this.currentProject];
    this.currentImageIndex = (this.currentImageIndex - 1 + gallery.length) % gallery.length;
    this.lightboxImage = `assets/images/${this.currentProject}/${gallery[this.currentImageIndex].src}`;
  }

  closeLightbox(): void {
    this.lightboxImage = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.lightboxImage) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'Escape') {
        this.closeLightbox();
      }
    }
  }
}