from manim import *


class ProjectNameGeneral(Scene):
    def construct(self):
        title = Text("Project Title", font_size=72)

        # Fade in
        self.play(Write(title), run_time=0.6)
        self.wait(2)
        # Fade out
        self.play(FadeOut(title), run_time=0.4)
