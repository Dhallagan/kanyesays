//
//  ViewController.swift
//  SoundBoard
//
//  Created by Dylan on 4/6/17.
//  Copyright © 2017 Dylan. All rights reserved.
//

import UIKit
import AVFoundation

class SoundViewController: UIViewController {

    @IBOutlet var jibberish: UIButton!
    @IBOutlet var allday: UIButton!
    @IBOutlet var stoptalkin: UIButton!
    @IBOutlet var thathumble: UIButton!
    @IBOutlet var thatwasgood: UIButton!
    
    var audioPlayer = AVAudioPlayer()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        allday.transform = CGAffineTransform(rotationAngle: -CGFloat.pi / 10)

        // Do any additional setup after loading the view, typically from a nib.
        
        

        let s_yo = Bundle.main.path(forResource: "Yo", ofType: "mp3")
        let s_doinggood = Bundle.main.path(forResource: "Doing-good", ofType: "mp3")
        let s_interrupts = Bundle.main.path(forResource: "interrupts", ofType: "mp3")
//

    }
    
    @IBAction func playAirhorn(_ sender: UIButton){
        let s_airhorn = Bundle.main.path(forResource: "Air-Horn", ofType: "mp3")
        
        print("pressed")
        playClip(clip: s_airhorn!)
        
    }

    
    @IBAction func playYo(_ sender: UIButton){
        let s_yo = Bundle.main.path(forResource: "Yo", ofType: "mp3")

        print("pressed")
        playClip(clip: s_yo!)
        
    }
    
    @IBAction func playAllDay(_ sender: UIButton){
    let s_allday = Bundle.main.path(forResource: "Alldayn***a", ofType: "mp3")
    print("pressed")
        playClip(clip: s_allday!)
    
    }
    
    @IBAction func playJibberish(_ sender: UIButton){
        let s_jibberish = Bundle.main.path(forResource: "Jibberish", ofType: "mp3")
            print("pressed")
        playClip(clip: s_jibberish!)
        
    }
    
    @IBAction func playThatsHumble(_ sender: UIButton){
        let s_thathumble = Bundle.main.path(forResource: "Thats-humble", ofType: "mp3")
        
        Bundle.main.path(forResource: "Jibberish", ofType: "mp3")
        print("pressed")
        playClip(clip: s_thathumble!)
        
    }
    
    @IBAction func playThatWasGood(_ sender: UIButton){
        let s_thatwasgood = Bundle.main.path(forResource: "That-was-good", ofType: "mp3")
        
        Bundle.main.path(forResource: "Jibberish", ofType: "mp3")
        print("pressed")
        playClip(clip: s_thatwasgood!)
        
    }
    
    
    @IBAction func playStopTalking(_ sender: UIButton){
        let s_stoptalkin = Bundle.main.path(forResource: "Stop-talkin-to-me", ofType: "mp3")

        
        Bundle.main.path(forResource: "Jibberish", ofType: "mp3")
        print("pressed")
        playClip(clip: s_stoptalkin!)
        
    }
    
    func playClip(clip: String){
            print("played")
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: clip))
            try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryAmbient)
            try AVAudioSession.sharedInstance().setActive(true)
        }
        catch{
            print(error)
        }
        
        audioPlayer.currentTime = 0
        audioPlayer.play()
    }
    


}

