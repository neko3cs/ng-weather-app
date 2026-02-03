import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain GitHub link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const githubLink = compiled.querySelector('a[href="https://github.com/neko3cs/ng-weather-app"]');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.textContent).toContain('GitHub Repos');
  });

  it('should contain X (Twitter) link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const xLink = compiled.querySelector('a[href="https://x.com/neko3cs"]');
    expect(xLink).toBeTruthy();
    expect(xLink?.textContent).toContain('開発者(X)');
  });

  it('should contain copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyright = compiled.querySelector('p');
    expect(copyright?.textContent).toContain('© 2026 neko3cs');
  });
});
