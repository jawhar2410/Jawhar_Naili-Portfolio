import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
lightboxImage: string | null = null;
  activeGalleries: string[] = []; // Permet plusieurs galeries ouvertes
  currentImageIndex: number = 0;
  currentProject: string = '';
  
  projectImages: { [key: string]: GalleryImage[] } = {
    pfe: [
       { src: 'Capture d\'écran 2024-05-12 165852.png', alt: 'Dashboard principal' },
    { src: 'Capture d\'écran 2024-05-22 181859.png', alt: 'Statistiques' },
    { src: 'Capture d\'écran 2024-05-24 204748.png', alt: "Page d'accueil" },
    { src: 'Capture d\'écran 2024-05-24 210707.png', alt: 'Page de réservation' },
    { src: 'Capture d\'écran 2024-05-24 210847.png', alt: 'Gestion des véhicules' },
    { src: 'Capture d\'écran 2024-05-24 211202.png', alt: 'Analyse des données' },
    { src: 'Capture d\'écran 2024-05-24 211257.png', alt: 'Détails véhicule' },
    { src: 'Capture d\'écran 2024-05-24 213205.png', alt: 'Interface admin' },
    { src: 'Capture d\'écran 2024-05-24 213243.png', alt: 'Gestion utilisateurs' },
    { src: 'Capture d\'écran 2024-05-24 213725.png', alt: 'Tableau de bord' },
    { src: 'Capture d\'écran 2024-05-24 213956.png', alt: 'Statistiques ventes' },
    { src: 'Capture d\'écran 2024-05-24 214153.png', alt: 'Configuration' },
    { src: 'Capture d\'écran 2024-05-24 214342.png', alt: 'Rapports' },
    { src: 'Capture d\'écran 2024-05-24 214806.png', alt: 'Floutage plaques' },
    { src: 'Capture d\'écran 2024-05-24 214850.png', alt: 'Module IA' },
    { src: 'Capture d\'écran 2024-05-24 214929.png', alt: 'Prédiction prix' },
    { src: 'Capture d\'écran 2024-05-24 215717.png', alt: 'Historique' },
    { src: 'Capture d\'écran 2024-05-24 215759.png', alt: 'Notifications' },
    { src: 'Capture d\'écran 2024-05-26 211451.png', alt: 'Export données' },
    { src: 'pfe-dashboard.png', alt: 'Vue globale dashboard' }
    ],
    stage: [
    { src: 'Capture d\'écran 2023-10-15 171423.png', alt: 'Interface projet - Vue globale' },
    { src: 'Capture d\'écran 2023-10-15 171513.png', alt: 'Gestion des tâches' },
    { src: 'Capture d\'écran 2023-10-15 171553.png', alt: 'Tableau Kanban' },
    { src: 'Capture d\'écran 2023-10-15 171635.png', alt: 'Détails d\'une tâche' },
    { src: 'Capture d\'écran 2023-10-15 171708.png', alt: 'Calendrier des projets' },
    { src: 'Capture d\'écran 2023-10-15 171745.png', alt: 'Notifications en temps réel' },
    { src: 'Capture d\'écran 2023-10-15 171820.png', alt: 'Export des données' },
    { src: 'Capture d\'écran 2023-10-15 171909.png', alt: 'Dashboard administrateur' },
    { src: 'Capture d\'écran 2023-10-15 171953.png', alt: 'Gestion des membres' },
    { src: 'Capture d\'écran 2023-10-15 172018.png', alt: 'Paramètres du projet' },
    { src: 'Capture d\'écran 2023-10-15 172038.png', alt: 'Profil utilisateur' }
  ],   pfa: [
     { src: 'Capture d’écran 2023-05-16 001519.png', alt: 'Description de l’image 1' },
  { src: 'Capture d’écran 2023-05-16 001701.png', alt: 'Description de l’image 2' },
  { src: 'Capture d’écran 2023-05-16 001726.png', alt: 'Description de l’image 3' },
  { src: 'Capture d’écran 2023-05-16 001748.png', alt: 'Description de l’image 4' },
  { src: 'Capture d’écran 2023-05-16 001810.png', alt: 'Description de l’image 5' },
  { src: 'Capture d’écran 2023-05-16 001832.png', alt: 'Description de l’image 6' },
  { src: 'Capture d’écran 2023-05-16 001846.png', alt: 'Description de l’image 7' },
  { src: 'Capture d’écran 2023-05-16 001906.png', alt: 'Description de l’image 8' },
  { src: 'Capture d’écran 2023-05-16 001917.png', alt: 'Description de l’image 9' }
    ],  

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